class Controllers {
    
    CheckAuthenticate (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }else {
            next();
        }
    }

    CheckNotAuthenticate (req, res, next) {
        if (!req.isAuthenticated()) {
            req.isLoggedIn = false;
            next()
        }else {
            req.isLoggedIn = true;
            next()
        }
    }
}

module.exports = new Controllers();