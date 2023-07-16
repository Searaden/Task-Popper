const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');

const Bounty = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4, // Assign the UUIDv4 function as the default value
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model:'task',
      id:'id'
    }
  },
});

Task.hasMany(Task, { as: 'subtasks', foreignKey: 'taskId' });

module.exports = Task;
