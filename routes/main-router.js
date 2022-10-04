const router = require('express').Router();
const { User, Post, Bookmark } = require('../models');

//dashboard/home page
router.get('/', async (req, res) => {
    try {
        //render dashboard/homepage
        res.render('');
    } catch (err) {
        res.status(500).json(err);
    }
});

//view post page
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if(postData){
            //Render post display page with the post data
            res.render('', { postData });
        } else {
            //render 404 page
            res.render('');
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/bookmarks/u/:id', async (req, res) => {
    try {
        const bookmarkData = await Bookmark.findAll({
            where: {
              user_id: req.params.user_id
            }
          });
        if(bookmarkData){
            //Render display page of user's bookmarks
            res.render('', { bookmarkData });
        } else {
            //render 404 page
            res.render('');
        }

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