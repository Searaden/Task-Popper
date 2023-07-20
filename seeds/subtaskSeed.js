// PURPOSE: give user a hands-on tutorial

const { Task } = require('../model');

const seedSubtasks = (parentTaskID) => Task.bulkCreate([
    // {
    //     name: 'You can create subtasks',
    //     size: 2,
    //     subtasks: parentTaskID
    // },
    // {
    //     name: 'You can edit subtasks of a subtask',
    //     size: 2,
    //     subtasks: parentTaskID
    // },
    // {
    //     name: 'You can delete them all the same',
    //     size: 4,
    //     subtasks: parentTaskID
    // },
]);



module.exports = seedSubtasks;