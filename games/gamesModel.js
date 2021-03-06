const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findBy,
  findByID,
  create,
};

function find() { 
  return db('games');
};

async function create(game) {
  const [id] = await db('games').insert(game);
  return db('games').where({id}).first();
};

function findBy(title) {
  return db('games').where({title}).first();
};

function findByID(id) {
  return db('games').where({id}).first();
}