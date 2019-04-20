const Games = require('./gamesModel.js');
const db = require('../data/dbConfig.js');

describe('the Games Model', () => {
  
  describe('the Create Fn', () => {

    it('should add a game to the database', async () => {
      const mockGame = {
        title: 'Mario',
        genre: 'Platformer',
        releaseYear: 1988
      }

      await Games.create(mockGame);

      const game = await db('Games');
      expect(game.length).toBe(1);
      expect(game).toEqual(mockgame);
    })
  })
})