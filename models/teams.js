// models/team.js
module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
      name: { type: DataTypes.STRING, allowNull: false },
      division: { type: DataTypes.STRING },
      recordWins: { type: DataTypes.INTEGER, defaultValue: 0 },
      recordLosses: { type: DataTypes.INTEGER, defaultValue: 0 },
    });
    return Team;
  };
  