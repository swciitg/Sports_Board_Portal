const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const request = require('supertest');
const { createServer } = require('../server');

const FIXTURE_BUILD_DIR = path.join(__dirname, 'fixtures', 'build');
const app = createServer(FIXTURE_BUILD_DIR);

test('known static route, default Accept -> 200 html app shell', async () => {
  const res = await request(app).get('/contacts');
  assert.equal(res.status, 200);
  assert.match(res.headers['content-type'], /text\/html/);
  assert.match(res.text, /id="root"/);
});

test('known route, Accept: text/markdown -> 200 markdown, Vary has both tokens', async () => {
  const res = await request(app).get('/').set('Accept', 'text/markdown');
  assert.equal(res.status, 200);
  assert.match(res.headers['content-type'], /text\/markdown/);
  assert.match(res.headers['vary'], /Accept\b/);
  assert.match(res.headers['vary'], /Accept-Encoding/);
});

test('unknown path, default Accept -> 404 but still the app shell (NotFoundPage renders)', async () => {
  const res = await request(app).get('/this-does-not-exist');
  assert.equal(res.status, 404);
  assert.match(res.text, /id="root"/);
});

test('unknown path, Accept: text/markdown -> 404 markdown with a recovery link', async () => {
  const res = await request(app).get('/this-does-not-exist').set('Accept', 'text/markdown');
  assert.equal(res.status, 404);
  assert.match(res.headers['content-type'], /text\/markdown/);
  assert.match(res.text, /sports-board/);
});

test('real static asset served correctly, unaffected by negotiation', async () => {
  const res = await request(app).get('/manifest.json').set('Accept', 'text/markdown');
  assert.equal(res.status, 200);
  assert.match(res.headers['content-type'], /application\/json/);
});

test('dynamic route /club/:name is treated as valid (200, not 404)', async () => {
  const res = await request(app).get('/club/anything');
  assert.equal(res.status, 200);
  assert.match(res.text, /id="root"/);
});
