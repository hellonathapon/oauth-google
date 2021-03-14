class Controllers {
    
    CheckAuthenticate (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }else {
            next();
        }
    }
}

module.exports = new Controllers();