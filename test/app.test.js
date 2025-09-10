const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  test('responds with 200 and contains greeting', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Hello from Node\.js/i);
  });
});

describe('GET /health', () => {
  test('returns json status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
