const { Post } = require('../models');

const postData = [
    {}
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;