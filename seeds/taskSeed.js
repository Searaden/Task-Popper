const { Task } = require('../model');

const taskData = [
    {
        name: 'Create NEW tasks with VERBS',
        size: 'big'
        //subtasks not needed
    },
    {
        name: 'Click me to see subtasks for this PROJECT',
        size: 'Big'
    },
    {
        name: 'Hold me to pop',
        size: 'small'
    },
]

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;