// models/game.js
module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
      date: { type: DataTypes.DATE, allowNull: false },
      location: { type: DataTypes.STRING },
      homeTeamId: { type: DataTypes.INTEGER, references: { model: 'Teams', key: 'id' } },
      awayTeamId: { type: DataTypes.INTEGER, references: { model: 'Teams', key: 'id' } },
      scoreHome: { type: DataTypes.INTEGER, defaultValue: 0 },
      scoreAway: { type: DataTypes.INTEGER, defaultValue: 0 },
    });
    return Game;
  };
  