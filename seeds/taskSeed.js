// PURPOSE: give user a hands-on tutorial

const { Task } = require('../model');

const taskData = [
    {
        name: 'Create NEW tasks with VERBS',
        size: 2
        //subtasks not needed
    },
    {
        name: 'Hold me to pop',
        size: 2
        //subtasks not needed
    },
    {
        name: 'Click me to view subtasks for this task',
        size: 4
        //subtasks need
    },
]

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;