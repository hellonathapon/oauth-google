class Controllers {
    Login (req, res, next) {
        console.log('Login Controller')
        next()
    }

    Logout (req, res, next) {
        console.log('Logout Controller')
        next()
    }
}

module.exports = new Controllers();