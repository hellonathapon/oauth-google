const express = require('express');
const router = express.Router();
const Controllers = require('../../controllers');

// a route to navigate to google consent screen and redirect
router.get ('/login', Controllers.Login, (req, res) => {
    console.log('redirect from Google consent screen')
    res.status(200)
    res.render('index')
})

module.exports = router;