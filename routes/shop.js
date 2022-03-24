const path = require('path');

const express = require('express');

const shopController = require('../../DHBW_WebDev_Opp_Zha/controllers/shop');

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

router.post('/auth', shopController.postLogin);

module.exports = router;