const router = require('express').Router();
const { Sequelize } = require('sequelize');
const sequelize = require('../../config/connection');
const { Post } = require('../../models');


router.post('/', async (req, res) => {
    try {
        //Before public deployement this MUST have authentication attached to it. Users should only be able to add their own Posts
        if (req.session.user_id && req.body.title && req.body.snippet) {
            const newPost = {
                title: req.body.title,
                snippet: req.body.snippet,
                description: req.body.description,
                user_id: req.session.user_id
            }
            console.log(newPost);
            const postData = await Post.create(newPost);
            res.status(200).json(postData);
        } else {
            res.status(400).send({ message: 'Invalid post parameters!' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

//SELECT *  FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id;
//For use in console to get post with bookmark count
//SELECT post.id, post.user_id, post.title, COUNT(bookmark.id) AS bookmark_count FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id GROUP BY post.id;
//For use in console to get posts with bookmark count in order of bookmark count
//SELECT post.id, post.user_id, post.title, COUNT(bookmark.id) AS bookmark_count FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id GROUP BY post.id ORDER BY COUNT(bookmark.id) DESC;
//raw query to get all posts with a count of their bookmark count
//SELECT post.*, COUNT(bookmark.id) AS bookmark_count FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id GROUP BY post.id;
//raw query to get all posts with a count of their bookmark count in order of bookmark count
//SELECT post.*, COUNT(bookmark.id) AS bookmark_count FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id GROUP BY post.id ORDER BY COUNT(bookmark.id) DESC;

/* router.get('/', async (req, res) => {
    try {
        let postData;
        if(req.query.sortBy == 'bookmarks'){
            postData = await sequelize.query('SELECT post.*, COUNT(bookmark.id) AS bookmark_count FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id GROUP BY post.id ORDER BY COUNT(bookmark.id) DESC');
        } else {
            postData = await sequelize.query('SELECT post.*, COUNT(bookmark.id) AS bookmark_count FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id GROUP BY post.id');
        }

        if (!postData) {
            res.status(404).json({ message: 'No Post with these parameters!' });

        } else {
            res.status(200).json(postData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
}); */

//consle raw query for posts bookmarked by a partictular user
//SELECT post.id, post.user_id, post.title, bookmark.user_id AS saved_by_id FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id WHERE bookmark.user_id = 2 GROUP BY post.id;
//raw query for sequelize
//SELECT post.* FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id WHERE bookmark.user_id = ? GROUP BY post.id

//get post with specified id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        console.log(postData);
        if (!postData) {
            res.status(404).json({ message: 'No post with this id!' });

        } else {
            res.status(200).json(postData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

//get all the Posts belonging to specificed user
router.get('/u/:user_id', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.params.user_id
            },
            attributes: {
                //Fields which won't be included in response data
                exclude: ['user_id']
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with these parameters!' });

        } else {
            res.status(200).json(postData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;