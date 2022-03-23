const app = require('../app.js');

exports.getIndex = (req, res) => {
       if(req.session.loggedin){
        res.render('shop/index');
        }

       else{
       res.render('shop/login')
    }
    res.end();


}

exports.getProducts = (req, res) => {
    res.render('shop/products');
}
exports.getCart = (req, res) => {
    res.render('shop/cart');
}
exports.getAccount = (req, res) => {
    res.render('shop/account');
}
exports.getLogin = (req, res) => {
    res.render('shop/login');
}

exports.getCheckout = (req, res)=>{
    res.render('shop/checkout')
}
exports.getConfirmation =(req, res)=>{
    res.render('shop/confirmation');
}
exports.getProductDetail = (req, res) =>{
    res.render('shop/product-detail', product);
}

exports.getAboutUs = (req, res)=>{
    res.render('shop/about-us');
}
exports.getContact = (req, res)=>{
    res.render('shop/contact');
}
exports.getBlasinstrumente = (req, res)=>{
    res.render('shop/blasinstrumente');
}
exports.getSchlaginstrumente = (req, res)=>{
    res.render('shop/schlaginstrumente');
}
exports.getSaiteninstrumente = (req, res)=>{
    res.render('shop/saiteninstrumente');
}

exports.postLogin = (request, response) =>{

    let username = request.body.username; //Eingabe des Users
    let password = request.body.password;

    console.log(request.body);
    console.log(username+ password);
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        app.connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                response.redirect('/');
            } else {
                response.send('Falscher Username oder Passwort');
            }
            response.end();
        });
    } else {
        response.send('Bitte Username und Passwort eingeben');
        response.end();
    }
}
