class Controllers {
    
    Logout (req, res, next) {
        console.log('Logout Controller')
        next()
    }
}

module.exports = new Controllers();