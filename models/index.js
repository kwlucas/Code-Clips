const User = require('./user');
const Post = require('./post');
const Bookmark = require('./bookmark');
const Tag = require('./tag');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo (User, {
    foreignKey: 'user_id'
});

//Many to many between users and posts with junction table, bookmark

User.belongsToMany(Post, {
    through: Bookmark,
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Bookmark,
    foreignKey: 'post_id'
});

// Bookmark.belongsTo (User, {
//     foreignKey: 'post_id'
// });
// User.hasMany(Bookmark, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });
//belongs to many need through 
// Post.belongsToMany(Tag, {
    
//     foreignKey: 'post_id',
//     onDelete: 'CASCADE'
// });
// Tag.hasMany(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'CASCADE'
// });

module.exports = { User, Post, Bookmark, Tag};