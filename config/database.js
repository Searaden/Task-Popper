const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // additional configuration options
});

module.exports = sequelize;