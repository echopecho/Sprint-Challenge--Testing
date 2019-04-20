const express = require('express');
const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.post('/', async (req, res) => {
  const { title, genre } = req.body;

  if(title && genre) {
    try {
      const newGame = await Games.create(req.body);
      res.status(201).json(newGame);
    } catch(e) {
      res.status(500).json({error: "Something went wrong with the server"})
    }
  } else {
    res.status(422).json({message: "Please include both title and genre"})
  }
});

module.exports = server;