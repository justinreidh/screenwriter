const sequelize = require('../config/database');
const User = require('./User');

const syncDatabase = async () => {
  await sequelize.sync({ force: true }); 
  console.log('Database synced');
};

module.exports = { sequelize, User, syncDatabase };