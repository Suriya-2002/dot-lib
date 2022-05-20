import express from 'express';

import * as shopController from './../controllers/shop.js';

const router = express.Router();

router.get('/', shopController.getIndexPage);
router.get('/details/:itemID', shopController.getDetailsPage);
router.get('/profile', shopController.getProfilePage);
router.post('/update-preferences', shopController.postPreferences);
router.post('/update-profile', shopController.postProfile);
router.post('/search', shopController.postSearchQuery);
router.post('/add-to-cart', shopController.postAddToCart);
router.post('/delete-cart-item', shopController.postDeleteCartItem);

export { router };
