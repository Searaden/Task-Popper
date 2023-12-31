const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');

class Bounty extends Model{};


Bounty.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, // Assign the UUIDv4 function as the default value
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model:'task',
        id:'id'
      }
    },
    // assignee_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'user',
    //     id:'id'
    //   }
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: 'bounty',
  }
  
);



module.exports = Bounty;
