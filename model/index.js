const User = require('./User');
const Task = require('./taskModel');
const Bounty = require('./bountyModel');

Task.hasMany(Task, {
  as: 'subtasks',
  foreignKey: 'taskId'
});

Task.hasOne(Bounty, {
  foreignKey: 'task_id',
  onDelete: "CASCADE",
});

Bounty.belongsTo(Task, {
    foreignKey: 'task_id',
    onDelete: "CASCADE",
});

User.hasMany(Task, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Task.belongsTo(User, {
  foreignKey: 'user_id',
});
module.exports = {User, Task, Bounty};