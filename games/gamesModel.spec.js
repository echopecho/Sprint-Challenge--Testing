const Games = require('./gamesModel.js');
const db = require('../data/dbConfig.js');

describe('the Games Model', () => {
  const mockGame = {
    title: 'Mario',
    genre: 'Platformer',
    releaseYear: 1988
  };

  beforeEach(() => {
    return db('games').truncate();
  })
  
  describe('the Create Fn', () => {

    it('should add a game to the database', async () => {
      await Games.create(mockGame);

      const game = await db('games');
      expect(game.length).toBe(1);
      expect(game[0]).toEqual({...mockGame, id: 1});
    });

    it('should return the newly added game', async () => {
      const game = await Games.create(mockGame);

      expect(game).toEqual({...mockGame, id: 1 });
    });
  });

  describe('the Find Fn', () => {

    it('should get all games on the database', async () => {
      await db('games').insert([
        mockGame,
        mockGame
      ]);

      const games = await Games.find();
      expect(games.length).toBe(2);
      expect(games[1].title).toBe('Mario');
    })
  })
})