const router = require('express').Router();
const { User, Post, Bookmark } = require('../models');

//dashboard/home page
router.get('/', async (req, res) => {
    try {
        
    } catch (err) {
        
    }
});

//view post page
router.get('/post/:id', async (req, res) => {
    try {
        
    } catch (err) {
        
    }
});

//login page
router.get('/login', (req, res) => {
    //If already signed in redirect to homepage
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    //   }
    
    
});

//sign up page
router.get('/signup', (req, res) => {
    //If already signed in redirect to homepage
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    //   }
    
});

module.exports = router;