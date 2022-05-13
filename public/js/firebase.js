import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'AIzaSyC0Knk7W5pfY4eRlM0vNMbYznV47fBHAuY',
    authDomain: 'dot-lib.firebaseapp.com',
    projectId: 'dot-lib',
    storageBucket: 'dot-lib.appspot.com',
    messagingSenderId: '811914504552',
    appId: '1:811914504552:web:87399527dc7c99d52a8edd',
    measurementId: 'G-D438YFH6TJ',
};

const state = {
    userID: '',
    name: '',
    email: '',
    cart: {
        total: 0,
        discount: 0,
        subtotal: 0,
        items: [],
    },
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const updateState = updatedState => {
    state.userID = localStorage.getItem('userID');

    state.name = updatedState.name;
    state.email = updatedState.email;

    state.cart.total = updatedState.cart.total;
    state.cart.discount = updatedState.cart.discount;
    state.cart.subtotal = updatedState.cart.subtotal;
    state.cart.items = updatedState.cart.items;
};

if (window.location.pathname === '/authentication') {
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

    const authenticateUserSignUp = async credentials => {
        try {
            const { name, email, password } = credentials;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            state.userID = userCredential.user.uid;
            localStorage.setItem('userID', state.userID);

            const userDocumentReference = doc(db, 'users', state.userID);
            await setDoc(userDocumentReference, { name: name, email: email });
        } catch (error) {
            throw error;
        }
    };

    const validateUserSignIn = error => {
        signInButton.classList.remove('button--disabled');

        if (error) {
            errorSignIn.innerHTML = error.message;
            return;
        }
    };

    const validateUserSignUp = error => {
        signUpButton.classList.remove('button--disabled');

        if (error) {
            errorSignUp.innerHTML = error.message;
            return;
        }

        window.location.href = '/';
    };

    const controlAuthenticationSignUp = async credentials => {
        try {
            await authenticateUserSignUp(credentials);
            validateUserSignUp();
        } catch (error) {
            validateUserSignUp(error);
        }
    };

    formSignIn.addEventListener('submit', async event => {
        try {
            event.preventDefault();
            signInButton.classList.add('button--disabled');

            const credentials = {
                email: emailSignIn.value,
                password: passwordSignIn.value,
            };

            await authenticateUserSignIn(credentials);
            validateUserSignIn();

            window.location.href = '/';
        } catch (error) {
            validateUserSignIn(error);
        }
    });

    formSignUp.addEventListener('submit', event => {
        event.preventDefault();
        signUpButton.classList.add('button--disabled');

        const credentials = {
            name: nameSignUp.value,
            email: emailSignUp.value,
            password: passwordSignUp.value,
        };

        controlAuthenticationSignUp(credentials);
    });

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
}

const loadPage = async () => {
    try {
        const userDocumentReference = doc(db, 'users', localStorage.getItem('userID'));
        const userDocument = await getDoc(userDocumentReference);

        updateState(userDocument.data());
    } catch (error) {
        throw error;
    }
};

const loadCart = async () => {};

if (window.location.pathname === '/') {
    loadPage();
    loadCart();
}
