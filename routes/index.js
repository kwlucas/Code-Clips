const router = require('express').Router();
const apiRoutes = require('./api');
const userRoutes = require('./user-router.js');
const mainRoutes = require('./main-router.js');

router.use('/', mainRoutes);
//router.use('/user', userRoutes);
router.use('/api', apiRoutes);

module.exports = router;