import express from 'express';

import * as errorController from './../controllers/errors.js';

const router = express.Router();

router.use('/', errorController.get404Page);

export { router };
