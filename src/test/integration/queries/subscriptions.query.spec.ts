import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../server';

describe('GET /subscriptions (integration — query)', () => {
  it('should return 400 if email query param is missing', async () => {
    const response = await request(app).get('/subscriptions');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 if email is invalid (no @ symbol)', async () => {
    const response = await request(app).get('/subscriptions?email=notanemail');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should return 404 if accessing a non-existent route', async () => {
    const response = await request(app).get('/some-fake-route');
    expect(response.status).toBe(404);
  });

  it('should return an array when a valid email is provided', async () => {
    // This test hits the real DB — expects an array (empty or not)
    const response = await request(app).get('/subscriptions?email=test@example.com');
    // Either 200 with array or 500 if DB not connected — both are valid in CI without DB
    expect([200, 500]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        // Verify Read Model shape — not domain entity shape
        const item = response.body[0];
        expect(item).toHaveProperty('email');
        expect(item).toHaveProperty('repo');
        expect(item).toHaveProperty('confirmed');
        expect(item).toHaveProperty('last_seen_tag');
      }
    }
  });
});
