// models/statistic.js
module.exports = (sequelize, DataTypes) => {
    const Statistic = sequelize.define('Statistic', {
      gameId: { type: DataTypes.INTEGER, references: { model: 'Games', key: 'id' } },
      playerId: { type: DataTypes.INTEGER, references: { model: 'Players', key: 'id' } },
      points: { type: DataTypes.INTEGER, defaultValue: 0 },
      assists: { type: DataTypes.INTEGER, defaultValue: 0 },
      rebounds: { type: DataTypes.INTEGER, defaultValue: 0 },
    });
    return Statistic;
  };
  