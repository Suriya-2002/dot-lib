import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js';
import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    query,
    where,
    limit,
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
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

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

const authenticateUserSignIn = async credentials => {
    try {
        const { email, password } = credentials;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        state.userID = userCredential.user.uid;
    } catch (error) {
        throw error;
    }
};

const authenticateUserSignUp = async credentials => {
    try {
        const { name, email, password } = credentials;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        state.userID = userCredential.user.uid;

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

    window.location.href = './../index.html';
};

const validateUserSignUp = error => {
    signUpButton.classList.remove('button--disabled');

    if (error) {
        errorSignUp.innerHTML = error.message;
        return;
    }

    window.location.href = './../index.html';
};

const controlAuthenticationSignIn = async credentials => {
    try {
        await authenticateUserSignIn(credentials);
        validateUserSignIn();
    } catch (error) {
        validateUserSignIn(error);
    }
};

const controlAuthenticationSignUp = async credentials => {
    try {
        await authenticateUserSignUp(credentials);
        validateUserSignUp();
    } catch (error) {
        validateUserSignUp(error);
    }
};

formSignIn.addEventListener('submit', event => {
    event.preventDefault();
    signInButton.classList.add('button--disabled');

    const credentials = {
        email: emailSignIn.value,
        password: passwordSignIn.value,
    };

    controlAuthenticationSignIn(credentials);
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
