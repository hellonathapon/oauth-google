const mongoose = require('mongoose');

const scheme = mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    picture: String,
});

const User = mongoose.model('User', scheme);
module.exports = User;