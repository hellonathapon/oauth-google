const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    // callback fucntion of consent screen
    // check if user is exists in db otherwise save one then pass user data to serialize for a cookie.
    console.log(profile)
    done(null, profile)
}));

passport.serializeUser(function(user, done){
    done(null, user.id)
});

passport.deserializeUser(function(id, done){
    done(null, id)
})

module.exports = passport;