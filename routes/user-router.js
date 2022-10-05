const router = require('express').Router();
const { User, Post, Bookmark } = require('../models');
const withAuth = require('../../utils/auth');

//FUTURE create profile page (for now it is only bookmark page)
router.get('/:id', async (req, res) => {
    try {
        const bookmarkData = await Bookmark.findAll({
            where: {
                user_id: req.params.user_id
            }
        });
        if (bookmarkData) {
            //Render display page of user's bookmarks
            res.render('bookmarks', { layout: 'user', bookmarkData });
        } else {
            //render 404 page
            res.status(404).end();
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id/new', async (req, res) => {
    try {
        //render new post page
        res.render('new-post', { layout: 'user' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id/bookmarks', async (req, res) => { //'/bookmarks/u/:id'
    try {
        const bookmarkData = await Bookmark.findAll({
            where: {
                user_id: req.params.user_id
            }
        });
        if (bookmarkData) {
            //Render display page of user's bookmarks
            res.render('bookmarks', { layout: 'user', bookmarkData });
        } else {
            //render 404 page
            res.status(404).end();
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;