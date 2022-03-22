const path = require('path');

const express = require('express');

const shopController = require('../../DHBW_WebDev_Opp_Zha/controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);


router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/account', shopController.getAccount);
router.get('/checkout', shopController.getCheckout)
router.get('/confirmation', shopController.getConfirmation)
router.get('/product-detail', shopController.getProductDetail);
router.get('/about-us', shopController.getAboutUs);
router.get('/contact', shopController.getContact);
router.get('/schlaginstrumente', shopController.getSchlaginstrumente);

module.exports = router;