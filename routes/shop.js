import express from 'express';

import * as shopController from './../controllers/shop.js';

const router = express.Router();

router.get('/', shopController.getIndexPage);

export { router };
