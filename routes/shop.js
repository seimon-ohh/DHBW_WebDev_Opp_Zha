const path = require('path');

const express = require('express');

const shopController = require('../../DHBW_WebDev_Opp_Zha/controllers/shop');
const userController = require('../../DHBW_WebDev_Opp_Zha/controllers/userController');

const router = express.Router();

router.get('/', shopController.getIndex);



router.get('/cart', shopController.getCart);
router.get('/account', shopController.getAccount);
router.get('/checkout', shopController.getCheckout)
router.get('/confirmation', shopController.getConfirmation);
router.get('/blasinstrumente', shopController.getBlasinstrumente);
router.get('/schlaginstrumente', shopController.getSchlaginstrumente);
router.get('/saiteninstrumente', shopController.getSaiteninstrumente);
router.get('/login', shopController.getLogin);
router.get('/register', shopController.getRegister);
router.get('/productdetail', shopController.getProductDetail)

//Login Logik
const { body } = require("express-validator");

const {
    homePage,
    register,
    registerPage,
    login,
    loginPage,
} = require('../controllers/userController');

const ifNotLoggedin = (req, res, next) => {
    if(!req.session.userID){
        return res.redirect('/login');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.userID){
        return res.redirect('/');
    }
    next();
}



router.get('/login', ifLoggedin, loginPage);
router.post('/login',
    ifLoggedin,
    [
        body("_email", "Email nicht gültig")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "Passwort muss mind. 4 Zeichen lang sein")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    login
);

router.get('/register', ifLoggedin, registerPage);
router.post(
    '/register',
    ifLoggedin,
    [
        body("_name", "Name muss mind. 3 Zeichen lang sein")
            .notEmpty()
            .escape()
            .trim()
            .isLength({ min: 3 }),
        body("_email", "Email nicht gültig")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "Passwort muss mind. 4 Zeichen lang sein")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    register
);

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        next(err);
    });
    res.redirect('/');
});

module.exports = router;