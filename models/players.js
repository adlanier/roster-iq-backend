// models/player.js
module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player', {
      name: { type: DataTypes.STRING, allowNull: false },
      position: { type: DataTypes.STRING },
      jerseyNumber: { type: DataTypes.INTEGER },
      // Remove this line if it exists: teamId: { type: DataTypes.INTEGER, references: { model: 'Teams', key: 'id' } }
    });
  
    Player.associate = (models) => {
      Player.belongsTo(models.Team, {
        foreignKey: 'teamId',  // specify custom foreign key if needed
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    };
  
    return Player;
  };
  