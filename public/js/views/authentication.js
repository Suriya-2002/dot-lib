const authenticationContainer = document.querySelector('.authentication');

const formSignIn = document.querySelector('.authentication__form--sign-in');
const emailSignIn = document.querySelector('.authentication__input--email-sign-in');
const passwordSignIn = document.querySelector('.authentication__input--password-sign-in');
const errorSignIn = document.querySelector('.authentication__error-message--sign-in');
const signInButton = document.querySelector('.button--sign-in');

const formSignUp = document.querySelector('.authentication__form--sign-up');
const nameSignUp = document.querySelector('.authentication__input--name-sign-up');
const emailSignUp = document.querySelector('.authentication__input--email-sign-up');
const passwordSignUp = document.querySelector('.authentication__input--password-sign-up');
const errorSignUp = document.querySelector('.authentication__error-message--sign-up');
const signUpButton = document.querySelector('.button--sign-up');
const signInOverlayButton = document.querySelector('.button--overlay-sign-in');
const signUpOverlayButton = document.querySelector('.button--overlay-sign-up');

export const validateUserSignIn = error => {
    signInButton.classList.remove('button--disabled');

    if (error) {
        errorSignIn.innerHTML = error.message;
        return;
    }

    window.location.href = '/';
};

export const validateUserSignUp = error => {
    signUpButton.classList.remove('button--disabled');

    if (error) {
        errorSignUp.innerHTML = error.message;
        return;
    }

    window.location.href = '/';
};

export const addHandlerSignIn = handler => {
    formSignIn.addEventListener('submit', event => {
        event.preventDefault();
        signInButton.classList.add('button--disabled');

        const credentials = {
            email: emailSignIn.value,
            password: passwordSignIn.value,
        };

        handler(credentials);
    });
};

export const addHandlerSignUp = handler => {
    formSignUp.addEventListener('submit', event => {
        event.preventDefault();
        signUpButton.classList.add('button--disabled');

        const credentials = {
            name: nameSignUp.value,
            email: emailSignUp.value,
            password: passwordSignUp.value,
        };

        handler(credentials);
    });
};

signInOverlayButton.addEventListener('click', () => {
    authenticationContainer.classList.remove('authentication--sign-up-active');

    formSignUp.reset();
    errorSignUp.innerHTML = '';
});

signUpOverlayButton.addEventListener('click', () => {
    authenticationContainer.classList.add('authentication--sign-up-active');

    formSignIn.reset();
    errorSignIn.innerHTML = '';
});
