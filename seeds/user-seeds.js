const { User } = require('../models');

const userData = [
    {
        username: 'brendon@email.com',
        password: 'password4Brendon'
    },
    {
        username: 'jess@email.com',
        password: 'password4Jess'
    },
    {
        username: 'jose@email.com',
        password: 'password4Jose'
    },
    {
        username: 'kyle@email.com',
        password: 'password4Kyle'
    },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;