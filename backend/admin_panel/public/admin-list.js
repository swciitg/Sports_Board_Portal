/* Per-resource "which columns to show" picker for the AdminJS List page,
 * plus a hover tooltip carrying the full value of every long text-field
 * cell. AdminJS has no built-in column picker, and richtext is the only
 * property type it truncates itself (see richtext/list.tsx, `lodash/
 * truncate` to 15 chars by default) — a plain string field
 * (default-property-value.tsx) renders the raw value with no wrapper and
 * no length limit at all.
 *
 * The *visible* clamp (2 lines, so a verbose field can't blow out a row's
 * height) is CSS, in admin-refinements.css — a <td>'s own box height in
 * standard table layout is driven by its row's content regardless of
 * max-height (confirmed live — clientHeight kept matching scrollHeight
 * with max-height set directly on the td), but BasePropertyComponent
 * wraps every value in a Box (a real <section> inside the cell), and
 * *that* element clamps normally. So this file no longer needs to cut the
 * string for display — truncateLongTextCells below only caps how much text
 * sits in the DOM (mutating it beyond that would be pointless, and this
 * keeps a pathological multi-KB field from bloating the page) and keeps
 * `title` supplied with the full value for the hover tooltip.
 *
 * Same "append to document.body, MutationObserver-driven" architecture as
 * admin-sidebar.js and for the same reason: the List table is owned by
 * AdminJS's React tree, and inserting our own elements into it risks React
 * later trying to reconcile children it doesn't recognise. The column
 * picker itself only reads attributes off that tree and never mounts
 * anything inside it; truncateLongTextCells below is the one exception,
 * and it only ever overwrites a text node's existing `.nodeValue` in
 * place — never adding, removing or wrapping nodes. That's the same DOM
 * edit React's own reconciler makes to update a cell's text, and React
 * always writes it unconditionally on its next render rather than
 * comparing against whatever's currently there — so as long as this only
 * mutates a value, never the tree shape, there's nothing for React to
 * detect as "wrong" and no reconciliation to break.
 *
 * Column identity: record-in-list.tsx stamps every body cell with
 * data-property-name="<propertyPath>". The header cells (property-header.tsx)
 * don't carry that attribute, but they're rendered from the exact same
 * `resource.listProperties` array in the same order, sandwiched between one
 * fixed checkbox cell and one fixed actions cell (records-table-header.tsx)
 * — so, after dropping the first/last, header cell N always corresponds to
 * body-row property N. That's how a label gets recovered for each
 * propertyPath below, since AdminJS doesn't expose one directly on the cell.
 */
(function () {
  var TABLE_SELECTOR = 'table[data-css$="-table"]';
  var currentResourceId = null;
  var panelOpen = false;

  function storageKey(resourceId) {
    return 'adminjs-hidden-columns-' + resourceId;
  }

  function loadHidden(resourceId) {
    try {
      var raw = localStorage.getItem(storageKey(resourceId));
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveHidden(resourceId, hidden) {
    try {
      localStorage.setItem(storageKey(resourceId), JSON.stringify(hidden));
    } catch (e) {
      // Ignore — worst case the choice doesn't persist across reloads.
    }
  }

  function getResourceId(table) {
    return (table.getAttribute('data-css') || '').replace(/-table$/, '');
  }

  // [{ propertyPath, label, headerEl }], in listProperties order.
  function getColumns(table) {
    var headerRow = table.querySelector('thead tr');
    var bodyRow = table.querySelector('tbody tr');
    if (!headerRow || !bodyRow) return [];

    var headerCells = Array.prototype.slice.call(headerRow.children, 1, -1);
    var bodyCells = bodyRow.querySelectorAll('td[data-property-name]');
    var columns = [];
    for (var i = 0; i < headerCells.length && i < bodyCells.length; i++) {
      var propertyPath = bodyCells[i].getAttribute('data-property-name');
      columns.push({
        propertyPath: propertyPath,
        label: headerCells[i].textContent.trim() || propertyPath,
        headerEl: headerCells[i],
      });
    }
    return columns;
  }

  function applyHiddenColumns(table, resourceId, columns) {
    var hidden = loadHidden(resourceId);
    var hiddenSet = {};
    for (var i = 0; i < hidden.length; i++) hiddenSet[hidden[i]] = true;

    columns.forEach(function (col) {
      col.headerEl.classList.toggle('adminjs-col-hidden', !!hiddenSet[col.propertyPath]);
    });

    var cells = table.querySelectorAll('tbody td[data-property-name]');
    for (var j = 0; j < cells.length; j++) {
      var td = cells[j];
      var name = td.getAttribute('data-property-name');
      td.classList.toggle('adminjs-col-hidden', !!hiddenSet[name]);
    }
  }

  // The visible clamp is CSS now (admin-refinements.css, 2 lines) — this
  // only bounds how much text stays in the DOM, so it's generous. `title`
  // (set below) always carries the untruncated value regardless.
  var TEXT_TRUNCATE_LENGTH = 400;

  // Cuts at the last space before the limit rather than mid-word, mirroring
  // AdminJS's own richtext truncation (lodash `truncate`, `separator: ' '`
  // — see richtext/list.tsx).
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    var cut = text.slice(0, maxLength);
    var lastSpace = cut.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.6) cut = cut.slice(0, lastSpace);
    return cut.replace(/[.,;:\s]+$/, '') + '…';
  }

  // record-in-list.tsx wraps every cell's value in <BasePropertyComponent>,
  // which itself wraps it in a <Box> (rendered as a <section>) — so even a
  // plain string field with no `availableValues` match (see
  // default-property-value.tsx, which returns `rawValue` directly) ends up
  // as td > section > (text node), not a bare text node straight in the
  // td. Walk down through that chain of single-element-child wrappers to
  // find it, bailing (null) the moment the structure isn't just that — a
  // badge, a reference link, an array/boolean summary etc. all render at
  // least one more element alongside the text, or multiple nodes, and are
  // left alone; those are already short by construction and don't have
  // this overflow problem.
  function findSoleTextNode(el) {
    var node = el;
    while (node.childNodes.length === 1) {
      var only = node.childNodes[0];
      if (only.nodeType === Node.TEXT_NODE) return only;
      if (only.nodeType !== Node.ELEMENT_NODE) return null;
      node = only;
    }
    return null;
  }

  // Full/truncated text is cached on the cell (data-full-text /
  // data-truncated-text) so re-runs don't re-truncate an already-truncated
  // string. If the live text matches neither cached value, AdminJS just
  // rendered something new here (a different record, an edited value) —
  // that becomes the new source of truth.
  function truncateLongTextCells(table) {
    var cells = table.querySelectorAll('tbody td[data-property-name]:not(.adminjs-col-hidden)');
    for (var i = 0; i < cells.length; i++) {
      var td = cells[i];
      var textNode = findSoleTextNode(td);
      if (!textNode) continue;
      var current = textNode.nodeValue;
      var cachedFull = td.getAttribute('data-full-text');
      var cachedTruncated = td.getAttribute('data-truncated-text');
      var full = (cachedFull !== null && current === cachedTruncated) ? cachedFull : current;
      var truncated = truncateText(full, TEXT_TRUNCATE_LENGTH);

      if (truncated !== full) {
        td.setAttribute('data-full-text', full);
        td.setAttribute('data-truncated-text', truncated);
        if (current !== truncated) textNode.nodeValue = truncated;
        if (td.title !== full) td.title = full;
      } else if (td.hasAttribute('data-full-text')) {
        td.removeAttribute('data-full-text');
        td.removeAttribute('data-truncated-text');
        if (td.title) td.removeAttribute('title');
      }
    }
  }

  function closePanel(panel, btn) {
    if (panel) panel.hidden = true;
    panelOpen = false;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function openPanel(panel, btn) {
    panel.hidden = false;
    panelOpen = true;
    btn.setAttribute('aria-expanded', 'true');
  }

  function buildPanel(panel, table, resourceId, columns) {
    panel.innerHTML = '';

    var titleRow = document.createElement('div');
    titleRow.className = 'adminjs-columns-title';
    var titleText = document.createElement('span');
    titleText.textContent = 'Columns';
    var resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'adminjs-columns-reset';
    resetBtn.textContent = 'Show all';
    resetBtn.addEventListener('click', function () {
      saveHidden(resourceId, []);
      applyHiddenColumns(table, resourceId, columns);
      truncateLongTextCells(table);
      buildPanel(panel, table, resourceId, columns);
    });
    titleRow.appendChild(titleText);
    titleRow.appendChild(resetBtn);
    panel.appendChild(titleRow);

    var hidden = loadHidden(resourceId);
    var hiddenSet = {};
    hidden.forEach(function (p) { hiddenSet[p] = true; });

    columns.forEach(function (col) {
      var label = document.createElement('label');
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !hiddenSet[col.propertyPath];
      checkbox.addEventListener('change', function () {
        var current = loadHidden(resourceId);
        var idx = current.indexOf(col.propertyPath);
        if (checkbox.checked && idx !== -1) current.splice(idx, 1);
        if (!checkbox.checked && idx === -1) current.push(col.propertyPath);
        saveHidden(resourceId, current);
        applyHiddenColumns(table, resourceId, columns);
        truncateLongTextCells(table);
      });
      var text = document.createElement('span');
      text.textContent = col.label;
      label.appendChild(checkbox);
      label.appendChild(text);
      panel.appendChild(label);
    });
  }

  function ensurePicker() {
    var table = document.querySelector(TABLE_SELECTOR);
    var btn = document.getElementById('adminjs-columns-toggle');
    var panel = document.getElementById('adminjs-columns-panel');

    if (!table) {
      // Not on a List page (or the resource has zero records, which
      // AdminJS renders without a <table> at all) — nothing to configure.
      if (btn) btn.style.display = 'none';
      closePanel(panel, btn);
      currentResourceId = null;
      return;
    }

    var resourceId = getResourceId(table);
    var columns = getColumns(table);
    if (!columns.length) return;

    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'adminjs-columns-toggle';
      btn.type = 'button';
      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-expanded', 'false');
      var icon = document.createElement('span');
      icon.className = 'adminjs-columns-icon';
      icon.appendChild(document.createElement('span'));
      icon.appendChild(document.createElement('span'));
      icon.appendChild(document.createElement('span'));
      var btnLabel = document.createElement('span');
      btnLabel.textContent = 'Columns';
      btn.appendChild(icon);
      btn.appendChild(btnLabel);
      document.body.appendChild(btn);

      panel = document.createElement('div');
      panel.id = 'adminjs-columns-panel';
      panel.hidden = true;
      document.body.appendChild(panel);

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (panelOpen) {
          closePanel(panel, btn);
        } else {
          openPanel(panel, btn);
        }
      });
      panel.addEventListener('click', function (e) {
        e.stopPropagation();
      });
      document.addEventListener('click', function () {
        if (panelOpen) closePanel(panel, btn);
      });
    }

    btn.style.display = 'flex';

    if (resourceId !== currentResourceId) {
      currentResourceId = resourceId;
      closePanel(panel, btn);
      buildPanel(panel, table, resourceId, columns);
    }

    applyHiddenColumns(table, resourceId, columns);
    truncateLongTextCells(table);
  }

  ensurePicker();
  var observer = new MutationObserver(ensurePicker);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
