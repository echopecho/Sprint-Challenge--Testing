const db = require('../data/dbConfig.js');

module.exports = {
  find,
  create,
};

async function find() { 
  return null;
};

async function create(game) {
  return db('games').insert(game);
};