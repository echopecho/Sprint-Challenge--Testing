const server = require('./server.js');
const request = require('supertest');

describe('the server', () => {

  it('should run the test database', () => {
    const env = process.env.DB_ENV;
    expect(env).toBe('testing');
  });
});

describe('Post /', () => {
  const mockGame = {
    title: 'Mario',
    genre: 'Platformer',
    releaseYear: 1988
  };

  beforeEach(() => {
    return db('game').trunctate();
  });

  it('should return 201 on success post', async () => {
    const res = await request(server).post('/').send(mockGame);
    expect(res.status).toBe(201);
  });
})