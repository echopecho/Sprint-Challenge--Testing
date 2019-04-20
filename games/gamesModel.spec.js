const Games = require('./gamesModel.js');
const db = require('../data/dbConfig.js');

describe('the Games Model', () => {

  beforeEach(() => {
    return db('games').truncate();
  })
  
  describe('the Create Fn', () => {
    const mockGame = {
      title: 'Mario',
      genre: 'Platformer',
      releaseYear: 1988
    };

    it('should add a game to the database', async () => {
      await Games.create(mockGame);

      const game = await db('games');
      expect(game.length).toBe(1);
      expect(game[0]).toEqual({...mockGame, id: 1});
    });

    it('should return the newly added game', async () => {
      const game = await Games.create(mockGame);

      expect(game).toEqual({...mockGame, id: 1 });
    })
  })
})