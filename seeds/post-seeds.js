const { Post } = require('../models');

const postData = [
    {
        user_id: 1,
        title: 'Sequelize Relationship',
        snippet: 'ModelA.hasMany(ModelB, {\n\tforeignKey: "modelA_id",\n\tonDelete: "CASCADE"\n});\n\nModelB.belongsTo(ModelA, {\n\tforeignKey: "modelA_id"\n});',
        description: 'A sequalize one to many relationship.'
    },
    {
        user_id: 2,
        title: 'HTML code block',
        snippet: '<pre>\nContents of the code block.\n</pre>',
        description: 'Content within the pre tags will bre presented nearly exactly as written and in monospace.\nPerfect for code blocks!'
    },
    {
        user_id: 4,
        title: 'Highlight.js on node',
        snippet: 'hljs = require(\'highlight.js\');\ndocument.querySelectorAll(".classYouWantHighlighted").foreach(el => {\n\thljs.highlightElement(el);\n});',
        description: 'This is for a basic syntax highlighting of HTML elements with a certain selector/class.'
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;