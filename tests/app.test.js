const request = require('supertest');
const app = require('../app');

describe('CI/CD JavaScript Sample Application API Endpoints', () => {
  it('GET / should return 200 OK and welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body).toHaveProperty('message');
    expect(res.body.author).toEqual('nivesh4087-spec');
  });

  it('GET /health should return 200 OK and status UP', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
    expect(res.body).toHaveProperty('uptime');
  });

  it('GET /api/v1/info should return application metadata', async () => {
    const res = await request(app).get('/api/v1/info');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'cicd-final-project-js');
    expect(res.body).toHaveProperty('version', '1.0.0');
  });

  it('GET /non-existent-route should return 404', async () => {
    const res = await request(app).get('/non-existent-route');
    expect(res.statusCode).toEqual(404);
  });
});
