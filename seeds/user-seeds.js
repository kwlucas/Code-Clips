const { User } = require('../models');

const userData = [
    {}
]

const seedUsers = () => User.bulkCreate(productData);

module.exports = seedUsers;