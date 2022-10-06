const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Bookmark } = require('../models');
const withAuth = require('../utils/auth');

//dashboard/home page
router.get('/', async (req, res) => {
    //console.log('home page request hit');
    try {
        //Use raw query to get all the posts sorted by bookmark count
        const posts = await sequelize.query('SELECT post.*, COUNT(bookmark.id) AS bookmark_count FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id GROUP BY post.id ORDER BY COUNT(bookmark.id) DESC', {type: sequelize.QueryTypes.SELECT});
        //Check if user is signed in
        let signedInUser = ''
        if(req.session.loggedIn){
            console.log('user is signed in');
            signedInUser = await User.findOne({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    //Fields which won't be included in response data
                    exclude: ['password']
                }
            });
            signedInUser = {
                "id": req.session.user_id,
                "username": signedInUser.username
            }
            //console.log(signedInUser)
        }
        let savedPosts = [];
        if (signedInUser) {
            //Use signed in user information in a raw query to get the bookmarks of that user
            savedPosts = await sequelize.query('SELECT post.* FROM post LEFT OUTER JOIN bookmark ON post.id = bookmark.post_id WHERE bookmark.user_id = ? GROUP BY post.id', {
                replacements: [signedInUser.id],
                type: sequelize.QueryTypes.SELECT
            });
            //console.log(savedPosts);
        }
        //render dashboard/homepage
        res.render('homepage', { posts, signedInUser, savedPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//view post page
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = {
            "id": postData.id,
            "title": postData.title,
            "snippet": postData.snippet,
            "description": postData.description,
            "user_id": postData.user_id
        }
        let signedInUser = ''
        if(req.session.loggedIn){
            signedInUser = await User.findOne({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    //Fields which won't be included in response data
                    exclude: ['password']
                }
            });
        }

        if (postData) {
            //Render post display page with the post data
            res.render('view-post', { post, signedInUser });
        } else {
            //FUTURE render 404 page
            console.log('view post 404');
            res.status(404).end();
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//new post page (with auth ensures that user is logged in before going to page, if not they are redirected to login page)
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
    res.render('login');
});

//sign up page
router.get('/signup', (req, res) => {
    //If already signed in redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('sign-up');
});

module.exports = router;