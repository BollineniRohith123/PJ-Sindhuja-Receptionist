const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(sequelizeConfig);

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Sync models
async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
}

// Initialize database
async function initializeDatabase() {
  await testConnection();
  await syncModels();
}

module.exports = sequelize;
module.exports.initializeDatabase = initializeDatabase;
