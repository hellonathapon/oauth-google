const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.serializeUser(function(user, done){
    done(null, user._id)
});

passport.deserializeUser(function(_id, done){

    User.findById({ _id }, function(err, user) {
        if (err) {
            return done(err)
        }
        done(null, user)
    })
})

// Google strategy
passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,

}, async (accessToken, refreshToken, profile, done) => {
    const { sub, email, name, picture } = profile._json;

    try {
        // check if user already exists in db
        const user = await User.findOne({ googleId: sub });

        if (!user) {
            // if not create one and pass it to serialize as cookie
            const newUser = await User.create({
                googleId: sub,
                email: email,
                name: name,
                picture: picture,
            });
            return done(null, newUser);
        } else {
            return done(null, user)
        }
    } catch (err) {
        console.error(err);
    }
}));

// Facebook Strategy
passport.use( new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email'], // technically the scope permission params.

}, async (accessToken, refreshToken, profile, done) => {
    
    const { id, name, email, picture } = profile._json;

    try {
        const user = await User.findOne({ facebookId: id });
        if (!user) {
            const newUser = await User.create({
                facebookId: id,
                name: name,
                email: email,
                picture: picture.data.url
            });
            return done(null, newUser);
        }else {
            return done(null, user)
        }
    }catch (err) {
        console.error(err)
    }
}))

module.exports = passport;