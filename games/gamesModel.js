const db = require('../data/dbConfig.js');

module.exports = {
  find,
  create,
};

async function find() { 
  return null;
};

async function create(game) {
  const [id] = await db('games').insert(game);
  return db('games').where({id}).first();
};