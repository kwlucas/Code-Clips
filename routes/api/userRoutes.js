const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        if(req.body.username && req.body.password){
            const userData = await User.create({
                username: req.body.username,
                password: req.body.password,
            });
            //session save
            res.json(userData);
        } else {
            res.status(400).send({ message: 'Invalid user parameters!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;