// Production static server for the CRA build, replacing the plain `serve -s
// build` command. Beyond serving files, this adds two things `serve` never
// gave agents/crawlers:
//   1. A real HTTP status code per path — 200 for a known SPA route, 404 for
//      anything else — instead of `serve -s`'s SPA-rewrite behavior that
//      always answers 200 with index.html no matter what was requested.
//   2. Accept-header content negotiation: a client that asks for
//      `text/markdown` gets a markdown document instead of the HTML shell.
//
// A 404-status response still serves index.html's body for HTML-preferring
// clients, so real browsers see the exact same NotFoundPage UI as before —
// browsers render an HTML document normally regardless of its status code,
// so this is invisible to humans while being a genuine 404 to agents.
const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const DEFAULT_BUILD_DIR = path.join(__dirname, 'build');
const SITE_BASENAME = '/sports-board';
const SITE_ROOT = 'https://swc.iitg.ac.in/sports-board/';

// Mirrors the <Route> list in src/App.js exactly.
const STATIC_ROUTES = new Set(['/', '/contacts', '/clubs', '/events', '/announcements']);
const DYNAMIC_ROUTE_PREFIXES = ['/club/', '/event/'];

function normalizePath(urlPath) {
  let p = urlPath;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  // Defensive: only matters if the reverse proxy ever forwards the full
  // external path unstripped instead of stripping '/sports-board' first.
  if (p === SITE_BASENAME) return '/';
  if (p.startsWith(SITE_BASENAME + '/')) p = p.slice(SITE_BASENAME.length);
  return p || '/';
}

function isKnownSpaRoute(p) {
  if (STATIC_ROUTES.has(p)) return true;
  return DYNAMIC_ROUTE_PREFIXES.some((prefix) => {
    if (!p.startsWith(prefix)) return false;
    const rest = p.slice(prefix.length);
    return rest.length > 0 && !rest.includes('/');
  });
}

function markdown404Body(requestedPath) {
  return (
    `# Not found\n\n` +
    `The page \`${requestedPath}\` does not exist.\n\n` +
    `- [Home](${SITE_ROOT})\n` +
    `- [Sitemap](${SITE_ROOT}sitemap.xml)\n` +
    `- [llms.txt](${SITE_ROOT}llms.txt)\n`
  );
}

function createServer(buildDir = DEFAULT_BUILD_DIR) {
  const app = express();
  const indexHtmlPath = path.join(buildDir, 'index.html');
  const llmsTxtPath = path.join(buildDir, 'llms.txt');

  // A literal request for /index.html should still go through the
  // status-code/negotiation logic below, not be served as a plain static file.
  app.get('/index.html', (req, res) => res.redirect(301, '/'));

  // Hashed build assets: safe to cache for a long time, immutably.
  app.use('/static', express.static(path.join(buildDir, 'static'), {
    immutable: true,
    maxAge: '1y',
    index: false,
  }));

  // Every other real file in build/ (manifest.json, robots.txt, sitemap.xml,
  // llms.txt, logos, images, pdfs, favicon, ...). index:false so a request
  // for '/' falls through to the page handler below instead of this
  // auto-serving index.html (which would bypass our status-code control).
  app.use(express.static(buildDir, { index: false }));

  // Page-request handler: only reached for GET/HEAD requests that didn't
  // resolve to a real file above.
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();

    const rawPath = req.path;
    if (path.extname(rawPath) !== '') {
      // Looked like a static asset request but no such file exists.
      return res.status(404).type('text/plain').send('Not found');
    }

    const normalized = normalizePath(rawPath);
    const known = isKnownSpaRoute(normalized);
    const status = known ? 200 : 404;

    res.set('Vary', 'Accept, Accept-Encoding');
    res.set('Cache-Control', 'no-cache');

    const format = req.accepts(['html', 'text/markdown']);

    if (format === 'text/markdown') {
      res.status(status).type('text/markdown; charset=utf-8');
      if (known) return res.send(fs.readFileSync(llmsTxtPath, 'utf8'));
      return res.send(markdown404Body(rawPath));
    }

    // html branch — also the fallback when format === false.
    res.status(status).sendFile(indexHtmlPath, (err) => {
      if (err && !res.headersSent) next(err);
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    if (!res.headersSent) res.status(500).send('Internal Server Error');
  });

  return app;
}

module.exports = { createServer, isKnownSpaRoute, normalizePath };

if (require.main === module) {
  createServer().listen(PORT, () => {
    console.log(`Frontend server listening on port ${PORT}`);
  });
}
