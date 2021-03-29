const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./configs/passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const Controllers = require('./controllers/index');
require('dotenv').config();

// DB connect
const dbString = `mongodb+srv://nathapon:${process.env.DB_PASSWORD}@cluster0.3dmkv.mongodb.net/oauth_users?retryWrites=true&w=majority`
mongoose.connect(dbString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('✔️' + ' ' + ' DB connected'))
.catch(err => console.log(err))
mongoose.connection.on('error', err => console.error(err)); // for catching err after connection was established.

// set up view engine
app.set('view engine', 'ejs');

// serve static file
app.use(express.static("public"));

app.use(cookieParser());

// set up cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY],
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());   

// handle routes
app.use('/user', require('./routes/user/index'));
app.use('/auth/facebook', require('./routes/auth/facebook/index'));
app.use('/auth/google', require('./routes/auth/google/index.js')); // route position order is important
app.use('/login', require('./routes/auth/index'));
app.use('/', Controllers.CheckNotAuthenticate, (req, res) => {
    res.render('index', { isLoggedIn: req.isLoggedIn, profilePic: req.profilePic });
})

// error handling midddleware
app.use(function(err, req, res, next) {
    res.status(500).send('something bloke!')
})


app.listen(port, console.log(`🚀 Server is running on port ${port}`));