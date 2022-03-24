
require('http');
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000, // 1hr
    }
}));



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.listen(3000)
