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
            req.profilePic = false;
            next()
        }else {
            req.isLoggedIn = true;
            req.profilePic = req.user.picture;
            next()
        }
    }
}

module.exports = new Controllers();