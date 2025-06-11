const request = require('supertest');
const express = require('express');
jest.mock('../backend/services/openai', () => ({
  getMovieRecommendation: jest.fn().mockResolvedValue('Mock recommendation')
}));

const recommendRouter = require('../backend/routes/recommend');

const app = express();
app.use(express.json());
app.use('/api/recommend', recommendRouter);

describe('/api/recommend route', () => {
  test('responds with recommendation and movies', async () => {
    const res = await request(app)
      .post('/api/recommend')
      .send({ genres: ['Sci-Fi'] });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('recommendation');
    expect(res.body).toHaveProperty('movies');
    expect(Array.isArray(res.body.movies)).toBe(true);
    expect(res.body.movies.length).toBeGreaterThan(0);
    expect(res.body.recommendation).toContain('Dune');
  });
});
