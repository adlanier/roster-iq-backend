// routes/team.js
const express = require('express');
const { Team } = require('../models');
const router = express.Router();

// Create a new team
router.post('/teams', async (req, res) => {
  try {
    const { name, division } = req.body;
    const team = await Team.create({ name, division });
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all teams
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single team by ID
router.get('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (team) res.json(team);
    else res.status(404).json({ message: 'Team not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a team
router.put('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (team) {
      await team.update(req.body);
      res.json(team);
    } else res.status(404).json({ message: 'Team not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a team
router.delete('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (team) {
      await team.destroy();
      res.json({ message: 'Team deleted' });
    } else res.status(404).json({ message: 'Team not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
