// routes/game.js
const express = require('express');
const { Game } = require('../models');
const router = express.Router();

// Create a new game
router.post('/games', async (req, res) => {
  try {
    const { date, location, homeTeamId, awayTeamId, scoreHome, scoreAway } = req.body;
    const game = await Game.create({ date, location, homeTeamId, awayTeamId, scoreHome, scoreAway });
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all games
router.get('/games', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single game by ID
router.get('/games/:id', async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (game) res.json(game);
    else res.status(404).json({ message: 'Game not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a game
router.put('/games/:id', async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (game) {
      await game.update(req.body);
      res.json(game);
    } else res.status(404).json({ message: 'Game not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a game
router.delete('/games/:id', async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (game) {
      await game.destroy();
      res.json({ message: 'Game deleted' });
    } else res.status(404).json({ message: 'Game not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
