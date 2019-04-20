const express = require('express');
const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.post('/', async (req, res) => {
  const newGame = await Games.create(req.body);
  res.status(201).json(newGame);
});

module.exports = server;