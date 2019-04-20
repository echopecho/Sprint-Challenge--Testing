const server = require('./server.js');
const request = require('supertest');

const db = require('../data/dbConfig.js');

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
    return db('games').truncate();
  });

  it('should return 201 on success post', async () => {
    const res = await request(server).post('/').send(mockGame);
    expect(res.status).toBe(201);
  });

  it('should return 422 if title is missing', async () => {
    const res = await request(server).post('/').send({...mockGame, title: null});
    expect(res.status).toBe(422);
  });

  it('should return 422 if genre is missing', async () => {
    const res = await request(server).post('/').send({...mockGame, genre: null});
    expect(res.status).toBe(422);
  });

  it('should return 405 if a duplcate game title is added', async () => {
    await db('games').insert(mockGame);
    const res = await request(server).post('/').send(mockGame);
    expect(res.status).toBe(405);
  })
});

describe('Get /', () => {
  const mockGame = {
    title: 'Mario',
    genre: 'Platformer',
    releaseYear: 1988
  };

  beforeEach(() => {
    return db('games').truncate();
  });

  it('should return status 200 and JSON data', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
  });

  it('should return an array of 2 items', async () => {
    const mockGame2 = {...mockGame, title: 'Luigi'};
    await db('games').insert([
      mockGame,
      mockGame2
    ]);
    const res = await request(server).get('/');
    expect(res.body.length).toBe(2);
  });

  it('should return an empty array if no games are on database', async () => {
    const res = await request(server).get('/');
    expect(res.body).toEqual([]);
  })
})