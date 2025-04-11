const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); 

const Screenplay = sequelize.define('Screenplay', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Untitled Screenplay',
  },
  content: {
    type: DataTypes.JSONB, 
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID, 
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

User.hasMany(Screenplay, { foreignKey: 'userId' });
Screenplay.belongsTo(User, { foreignKey: 'userId' });

module.exports = Screenplay;