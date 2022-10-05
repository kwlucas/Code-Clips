const router = require('express').Router();
const { User, Post, Bookmark } = require('../models');
const withAuth = require('../../utils/auth');

//dashboard/home page
router.get('/', async (req, res) => {
    try {
        const posts = await fetch('/api/posts?sortBy=bookmarks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let signedInUser = await User.findOne({
            where: {
                id: req.session.user_id,
            },
            attributes: {
                //Fields which won't be included in response data
                exclude: ['password']
            }
        });
        let savedPosts = [];
        if (signedInUser) {
            savedPosts = await fetch(`/api/bookmarks/u/${req.session.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
        //render dashboard/homepage
        res.render('homepage', { posts, signedInUser, savedPosts });
    } catch (err) {
        res.status(500).json(err);
    }
});

//view post page
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            //Render post display page with the post data
            res.render('view-post', { postData });
        } else {
            //FUTURE render 404 page
            res.status(404).end();
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//new post page
router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('new-post');
    } catch (err) {
        res.status(500).json(err);
    }
});

//login page
router.get('/login', (req, res) => {
    //If already signed in redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
});

//sign up page
router.get('/signup', (req, res) => {
    //If already signed in redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
});

module.exports = router;