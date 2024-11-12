// routes/statistic.js
const express = require('express');
const { Statistic } = require('../models');
const router = express.Router();

// Create a new statistic record
router.post('/statistics', async (req, res) => {
  try {
    const { gameId, playerId, points, assists, rebounds } = req.body;
    const statistic = await Statistic.create({ gameId, playerId, points, assists, rebounds });
    res.status(201).json(statistic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all statistics
router.get('/statistics', async (req, res) => {
  try {
    const statistics = await Statistic.findAll();
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get statistics for a single player by game ID
router.get('/statistics/:gameId/:playerId', async (req, res) => {
  try {
    const statistic = await Statistic.findOne({
      where: { gameId: req.params.gameId, playerId: req.params.playerId },
    });
    if (statistic) res.json(statistic);
    else res.status(404).json({ message: 'Statistic not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a statistic
router.put('/statistics/:id', async (req, res) => {
  try {
    const statistic = await Statistic.findByPk(req.params.id);
    if (statistic) {
      await statistic.update(req.body);
      res.json(statistic);
    } else res.status(404).json({ message: 'Statistic not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a statistic
router.delete('/statistics/:id', async (req, res) => {
  try {
    const statistic = await Statistic.findByPk(req.params.id);
    if (statistic) {
      await statistic.destroy();
      res.json({ message: 'Statistic deleted' });
    } else res.status(404).json({ message: 'Statistic not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
