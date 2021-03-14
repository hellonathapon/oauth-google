const express = require('express');
const router = express.Router();
const Controllers = require('../../controllers');
const passport = require('passport');

// this particular route only navigate to google consent screen
// and if login successfully, it will automatically redirect to `redirect` route
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // scope of data 
}));

// redirected route from consent screen.
router.get('/redirect', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/user')    
});


router.get('/logout', (req, res) => {
    req.logout(); // terminate session;
    res.redirect('/');
})

module.exports = router;