const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('facebook'));

router.get('/callback', passport.authenticate('facebook'), (req, res) => {
    console.log('hit fb callback route')
    res.redirect('/user');
})



module.exports = router;