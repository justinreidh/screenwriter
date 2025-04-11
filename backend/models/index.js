const sequelize = require('../config/database');
const User = require('./User');
const Screenplay = require('./Screenplay');

const syncDatabase = async () => {
  await sequelize.sync({ force: true }); 
  console.log('Database synced');
};

module.exports = { sequelize, User, Screenplay, syncDatabase };