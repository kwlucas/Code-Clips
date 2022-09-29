const { Bookmark } = require('../models');

const bookmarkData = [
    {}
]

const seedBookmarks = () => Bookmark.bulkCreate(bookmarkData);

module.exports = seedBookmarks;