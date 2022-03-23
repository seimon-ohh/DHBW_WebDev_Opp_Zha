
require('http');
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')



const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

exports.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345678',
    database : 'nodelogin'
});


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000)
