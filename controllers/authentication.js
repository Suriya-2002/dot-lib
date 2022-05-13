import * as user from './../models/user.js';

export const getAuthenticationPage = (req, res, next) => {
    res.render('authentication');
};

export const postAuthenticationSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await user.authenticationSignIn(email, password);

        res.redirect('/');
    } catch (error) {
        next(error);
    }
};

export const postAuthenticationSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        await user.authenticationSignUp(name, email, password);

        res.redirect('/');
    } catch (error) {
        next(error);
    }
};
