import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';

test('unmatched route returns a markdown 404 pointing home', async () => {
  const res = await request(app).get('/this-route-does-not-exist');
  assert.equal(res.status, 404);
  assert.match(res.headers['content-type'], /^text\/markdown/);
  assert.match(res.text, /swc\.iitg\.ac\.in\/sports-board/);
});

test('existing route is unaffected by the catch-all', async () => {
  const res = await request(app).get('/');
  assert.equal(res.status, 200);
  assert.match(res.text, /Welcome to the Home Page/);
});
