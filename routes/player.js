// routes/player.js
const express = require('express');
const { Player } = require('../models');
const router = express.Router();

// Create a new player
router.post('/players', async (req, res) => {
  try {
    const { name, position, jerseyNumber, teamId } = req.body;
    const player = await Player.create({ name, position, jerseyNumber, teamId });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all players
router.get('/players', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single player by ID
router.get('/players/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) res.json(player);
    else res.status(404).json({ message: 'Player not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a player
router.put('/players/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      await player.update(req.body);
      res.json(player);
    } else res.status(404).json({ message: 'Player not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a player
router.delete('/players/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      await player.destroy();
      res.json({ message: 'Player deleted' });
    } else res.status(404).json({ message: 'Player not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
