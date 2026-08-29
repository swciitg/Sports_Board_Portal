/* Adds a collapse/expand toggle to the AdminJS sidebar (see admin-sidebar.css
 * for the styling this drives). AdminJS's sidebar is rendered by its React
 * bundle, so the toggle button is appended to <body> instead of the sidebar
 * itself — inserting into a React-owned subtree risks the next re-render
 * discarding it. A MutationObserver waits for the sidebar to mount (this
 * script loads before the bundle runs) and keeps running for the page's
 * lifetime so it can also keep the category force-closed whenever the rail
 * is collapsed (see collapseCategoriesIfCollapsed below); the
 * collapsed/expanded state persists across page loads via localStorage.
 */
(function () {
  var STORAGE_KEY = 'adminjs-sidebar-collapsed';

  function isCollapsed() {
    return document.documentElement.classList.contains('adminjs-sidebar-collapsed');
  }

  function applyState(collapsed) {
    document.documentElement.classList.toggle('adminjs-sidebar-collapsed', collapsed);
  }

  var initiallyCollapsed = false;
  try {
    initiallyCollapsed = localStorage.getItem(STORAGE_KEY) === '1';
  } catch (e) {
    // localStorage unavailable (private mode, etc.) — default to expanded.
  }
  applyState(initiallyCollapsed);

  function setButtonLabel(btn) {
    var collapsed = isCollapsed();
    btn.textContent = collapsed ? '›' : '‹'; // › or ‹
    btn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    btn.setAttribute('aria-expanded', String(!collapsed));
  }

  // A category row (has an .arrow-box) toggles its resource links on/off by
  // mounting/unmounting them entirely — AdminJS keeps no "always closed"
  // mode. admin-sidebar.css disables clicking that row while the rail is
  // collapsed (there's no room for a resource list in a 64px icon rail), so
  // this keeps it forced shut instead: whenever the rail is collapsed and a
  // category's resource list is still mounted, it simulates the click that
  // closes it. element.click() still fires React's handler even though CSS
  // pointer-events:none blocks real clicks on the row — that only affects
  // hit-testing for actual pointer input.
  function collapseCategoriesIfCollapsed() {
    if (!isCollapsed()) return;
    var links = document.querySelectorAll('[data-css="sidebar-resources"] a');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (!a.querySelector('.arrow-box')) continue;
      var li = a.parentElement;
      if (li && li.querySelector(':scope > ul')) a.click();
    }
  }

  function ensureToggleButton() {
    collapseCategoriesIfCollapsed();
    if (document.getElementById('adminjs-sidebar-toggle')) return true;
    if (!document.querySelector('[data-css="sidebar"]')) return false;

    var btn = document.createElement('button');
    btn.id = 'adminjs-sidebar-toggle';
    btn.type = 'button';
    setButtonLabel(btn);
    btn.addEventListener('click', function () {
      var next = !isCollapsed();
      applyState(next);
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch (e) {
        // Ignore — worst case the choice doesn't persist across reloads.
      }
      setButtonLabel(btn);
      collapseCategoriesIfCollapsed();
    });
    document.body.appendChild(btn);
    return true;
  }

  // Kept running for the page's lifetime rather than disconnected after the
  // button first mounts: AdminJS is a single-page app, and a category can be
  // re-opened (e.g. by a stray click before pointer-events:none applies, or
  // restored from AdminJS's own state) at any point while still collapsed.
  ensureToggleButton();
  var observer = new MutationObserver(ensureToggleButton);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
