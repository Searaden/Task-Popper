// This index will set up:
// TODO: The homepage bubbles
// The bubble to update setting (feat pushed)

const { Task, Bounty /*,User */ } = require('../model');

const seedTasks = require('./taskSeed');
const seedSubtasks = require('./subtaskSeed');
const seedBounty = require('./bountySeed');
//const seedUsers = require('./userSeed');

const seedAll = async () =>{
    //await seedUsers();
    const seededTasks = await seedTasks();
    const superTask = seededTasks[2].dataValues.id; 
    //console.log("Creating subtasks for: "+ superTask)
    //await seedSubtasks(superTask);
    //TODO: need to pass seeded tasks UUID to seed Bounties (array.map)
    //await seedBounty(); //! im not sure how to pass task id...
}

seedAll();