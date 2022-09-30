const router = require('express').Router();
const { Post } = require('../../models');


router.post('/', async (req, res) => {
    try {
        //Before public deployement this MUST have authentication attached to it. Users should only be able to add their own bookmarks
        if (req.body.user_id && req.body.title && req.body.snippet) {
            const postData = await Post.create(req.body);
            res.status(200).json(postData);
        } else {
            res.status(400).send({ message: 'Invalid post parameters!' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

//get post with specified id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
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