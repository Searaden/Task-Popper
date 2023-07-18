const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');
const Bounty = require('../model/taskModel');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4, // Assign the UUIDv4 function as the default value
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Task.hasMany(Task, { as: 'subtasks', foreignKey: 'taskId' });
Task.hasOne(Bounty, {
  foreignKey: 'taskId',
  onDelete: "CASCADE",
});


module.exports = Task;
