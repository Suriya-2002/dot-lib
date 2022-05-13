import express from 'express';

import * as authenticationController from './../controllers/authentication.js';

const router = express.Router();

router.get('/', authenticationController.getAuthenticationPage);

router.post('/sign-in', authenticationController.postAuthenticationSignIn);
router.post('/sign-up', authenticationController.postAuthenticationSignUp);

export { router };
