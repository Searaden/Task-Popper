// This index will set up:
// TODO: The bubbles to log in/sign up
// TODO: The bubbles to first log in
// The bubble to update setting (feat pushed)

const { Task, Bounty /*,User */ } = require('../model');

const seedTasks = require('./taskSeed');
const seedBounties = require('./bountySeed');
//const seedUsers = require('./userSeed');

const seedAll = async () =>{
    //await seedUsers();
    await seedTasks();
    //TODO: need to pass seeded tasks UUID to seed Bounties (array.map)
    await seedBounties(); //MUST OCCUR AFTER TASKS SEED
}

// uncommment seedAll();