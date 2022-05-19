import express from 'express';

import * as shopController from './../controllers/shop.js';

const router = express.Router();

router.get('/', shopController.getIndexPage);

router.post('/search', shopController.postSearchQuery);
router.post('/add-to-cart', shopController.postAddToCart);

router.get('/details/:itemID', shopController.getDetailsPage);
router.get('/checkout', shopController.getCheckoutPage);

router.get('/profile', shopController.getProfileData);


export { router };
