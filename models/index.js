const User = require('./user');
const Post = require('./post');
const Bookmark = require('./bookmark');
const Tag = require('./tag');

User.hasMany(Post, Bookmark, Tag, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo (User, {
    foreignKey: 'user_id'
});

Bookmark.belongsTo (User, {
    foreignKey: 'user_id'
});

Tag.belongsTo (User {
    foreignKey: 'user_id'
});

module.exports = { User, Post, Bookmark, Tag};