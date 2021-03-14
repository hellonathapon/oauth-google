const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./configs/passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// DB connect
mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('✔️' + ' ' + ' DB connected'))
.catch(err => console.log(err))
mongoose.connection.on('error', err => console.error(err)); // catch err after connection was established.

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

// handle routes
app.use('/user', require('./routes/user/index'));
app.use('/auth', require('./routes/auth/index.js')); // route position order is important
app.use('/', (req, res) => {
    res.render('index');
})


app.listen(port, console.log(`🚀 Server is running on port ${port}`));