const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_db', 'root', 'Long_54manBean99', {
  host: 'localhost',
  dialect: 'mysql',
  // additional configuration options
});

module.exports = sequelize;