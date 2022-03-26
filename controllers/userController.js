const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const dbConnection = require("../utils/dbConnection");

// Home Page
exports.homePage = async (req, res, next) => {
    const [row] = await dbConnection.execute("SELECT * FROM `users` WHERE `id`=?", [req.session.userID]);

    if (row.length !== 1) {
        return res.redirect('/logout');
    }

    res.render('/', {
        user: row[0]
    });
}

// Register Page
exports.registerPage = (req, res, next) => {
    res.render('shop/register');
};

// User Registration
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    const {body} = req;

    if (!errors.isEmpty()) {
        return res.render('shop/register', {
            error: errors.array()[0].msg
        });
    }

    try {

        const [row] = await dbConnection.execute(
            "SELECT * FROM `users` WHERE `email`=?",
            [body._email]
        );

        if (row.length >= 1) {
            return res.render('shop/register', {
                error: 'Diese Email wird bereits verwendet'
            });
        }

        const hashPass = await bcrypt.hash(body._password, 12);

        const [rows] = await dbConnection.execute(
            "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",
            [body._name, body._email, hashPass]
        );

        if (rows.affectedRows !== 1) {
            return res.render('shop/register', {
                error: 'Registrierung fehlgeschlagen'
            });
        }

        res.render('shop/register', {
            msg: 'Registrierung erfolgreich!'
        });

    } catch (e) {
        next(e);
    }
};

// Login Page
exports.loginPage = (req, res, next) => {
    res.render('shop/login');
};

// Login User
exports.login = async (req, res, next) => {

    const errors = validationResult(req);
    const {body} = req;

    if (!errors.isEmpty()) {
        return res.render('shop/login', {
            error: errors.array()[0].msg
        });
    }

    try {

        const [row] = await dbConnection.execute('SELECT * FROM `users` WHERE `email`=?', [body._email]);

        if (row.length != 1) {
            return res.render('shop/login', {
                error: 'Email Adresse ungülitg'
            });
        }

        const checkPass = await bcrypt.compare(body._password, row[0].password);

        if (checkPass === true) {
            req.session.userID = row[0].id;
            return res.redirect('/');
        }

        res.render('shop/login', {
            error: 'Passwort ungültig'
        });


    } catch (e) {
        next(e);
    }

}