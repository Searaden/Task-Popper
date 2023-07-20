const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');

class Task extends Model {}

Task.init(
  {
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
    // task_id: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model:'task',
    //     as: 'subtask',
    //     id:'id'
    //   }
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: 'task',
  }
);

module.exports = Task;
