const express = require('express');
const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.post('/', async (req, res) => {
  const { title, genre } = req.body;

  if(title && genre) {
    try {
      const duplicate = await Games.findBy(title);

      if(!duplicate) {
        const newGame = await Games.create(req.body);
        res.status(201).json(newGame);
      } else {
        res.status(405).json({message: "A game by that title already exists"})
      }
      
    } catch(e) {
      res.status(500).json({error: "Something went wrong with the server"})
    }
    
  } else {
    res.status(422).json({message: "Please include both title and genre"})
  }
});

server.get('/', async (req, res) => {
  try {
    const games = await Games.find();
    res.status(200).json(games);
  } catch(e) {
    res.status(500).json({error: "Something went wrong with the server"})
  }
})

module.exports = server;