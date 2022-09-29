const { Bookmark } = require('../models');

const bookmarkData = [
    {
        user_id: 1,
        post_id: 1,
    },
    {
        user_id: 2,
        post_id: 2,
    },
    {
        user_id: 2,
        post_id: 3,
    },
    {
        user_id: 3,
        post_id: 1,
    },
    {
        user_id: 3,
        post_id: 2,
    },
    {
        user_id: 3,
        post_id: 3,
    },
    {
        user_id: 4,
        post_id: 3,
    },
]

const seedBookmarks = () => Bookmark.bulkCreate(bookmarkData);

module.exports = seedBookmarks;