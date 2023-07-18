const Bounty = require('../model/bountyModel');

const bountyData = [
    {
        price: 10,
        task_id: 1,
    },
    {
        price: 100,
        task_id: 2,
    },
    {
        price: 200,
        task_id: 3,
    },
    {
        price: 133,
        task_id: 4,
    },{
        price: 266,
        task_id: 5,
    },
]

const seedBounty = () => Bounty.bulkCreate(bountyData);

module.exports = seedBounty;