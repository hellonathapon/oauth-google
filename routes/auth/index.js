const express = require('express');
const router = express.Router();
const Controllers = require('../../controllers');
const passport = require('passport');

// this particular route only navigate to google consent screen
// and if login successfully, it will automatically redirect to `redirect` route
router.get('/google', passport.authenticate('google', {
    scope: ['profile'] // scope param is required to consent screen!
}));

// a redirect route from consent screen.
router.get('/redirect',passport.authenticate('google'), (req, res) => {
    console.log('get back from consent screen')
    // redirect to User profile 
})

module.exports = router;