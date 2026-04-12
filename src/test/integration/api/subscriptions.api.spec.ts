import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../server';

describe('subscription test', () => {
  it('should return 400 Bad Request if email is not passed in query parameters', async () => {
    const response = await request(app).get('/subscriptions');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
  it('should return 404 if you access a non-existent route', async () => {
    const response = await request(app).get('/some-fake-route');
    expect(response.status).toBe(404);
  });
});