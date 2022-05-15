import express from 'express';

import * as shopController from './../controllers/shop.js';

const router = express.Router();

router.get('/', shopController.getIndexPage);

router.post('/search', shopController.postSearchQuery);

router.get('/details/:itemID', shopController.getDetailsPage);
router.get('/checkout', shopController.getCheckoutPage);

export { router };
