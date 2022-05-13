import * as model from '/js/model.js';
import * as authenticationView from '/js/views/authentication.js';

const controlAuthenticationSignIn = async credentials => {
    try {
        await model.authenticateUserSignIn(credentials);
        authenticationView.validateUserSignIn();
    } catch (error) {
        authenticationView.validateUserSignIn(error);
    }
};

const controlAuthenticationSignUp = async credentials => {
    try {
        await model.authenticateUserSignUp(credentials);
        authenticationView.validateUserSignUp();
    } catch (error) {
        authenticationView.validateUserSignUp(error);
    }
};

(() => {
    authenticationView.addHandlerSignIn(controlAuthenticationSignIn);
    authenticationView.addHandlerSignUp(controlAuthenticationSignUp);
})();
