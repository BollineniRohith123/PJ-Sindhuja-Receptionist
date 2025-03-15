require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:'
  },
  production: {
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH || './production.sqlite',
    logging: false
  }
};
