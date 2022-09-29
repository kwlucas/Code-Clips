const { Post } = require('../models');

const postData = [
    {
        title: 'Sequelize Relationship',
        snippet: 'Post one snippet',
        description: 'A sequalize one to many relationship.',
        user_id: 1
    },
    {
        title: 'HTML code block',
        snippet: '<pre>Contents of the code block.</pre>',
        description: 'Content within the pre tags will bre presented nearly exactly as written and in monospace. Perfect for code blocks!',
        user_id: 2
    },
    {
        title: 'Highlight.js on node',
        snippet: 'Post three snippet',
        description: 'This is for a basic syntax highlighting of HTML elements with a certain selector/class.',
        user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

//'ModelA.hasMany(ModelB, {\n\tforeignKey: "modelA_id",\n\tonDelete: "CASCADE"\n});\n\nModelB.belongsTo(ModelA, {\n\tforeignKey: "modelA_id"\n});',
//'hljs = require(\'highlight.js\');\ndocument.querySelectorAll(".classYouWantHighlighted").foreach(el => {\n\thljs.highlightElement(el);\n});',