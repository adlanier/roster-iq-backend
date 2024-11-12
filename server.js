// server.js

const express = require('express');
const { sequelize } = require('./models');
const teamRoutes = require('./routes/team');
const playerRoutes = require('./routes/player');
const gameRoutes = require('./routes/game');
const statisticRoutes = require('./routes/statistic');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Apply routes
app.use('/api', teamRoutes);
app.use('/api', playerRoutes);
app.use('/api', gameRoutes);
app.use('/api', statisticRoutes);

// Sync the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Conditionally start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for testing
module.exports = app;
