const express = require('express');
const router = express.Router();
const passport = require('passport');

// navigate to google consent screen
router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email'] // scope of data 
}));

// redirected route from consent screen.
router.get('/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/user')    
});


router.get('/logout', (req, res) => {
    req.logout(); // terminate session;
    res.redirect('/');
})

module.exports = router;