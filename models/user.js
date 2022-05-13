import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC0Knk7W5pfY4eRlM0vNMbYznV47fBHAuY',
    authDomain: 'dot-lib.firebaseapp.com',
    projectId: 'dot-lib',
    storageBucket: 'dot-lib.appspot.com',
    messagingSenderId: '811914504552',
    appId: '1:811914504552:web:87399527dc7c99d52a8edd',
    measurementId: 'G-D438YFH6TJ',
};

export const state = {
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
const auth = getAuth(app);
const db = getFirestore(app);

const updateState = updatedState => {
    state.name = updatedState.name;
    state.email = updatedState.email;

    state.cart.total = updatedState.cart.total;
    state.cart.discount = updatedState.cart.discount;
    state.cart.subtotal = updatedState.cart.subtotal;
    state.cart.items = updatedState.cart.items;
};

const loadPage = async () => {
    const userDocumentReference = doc(db, 'users', state.userID);
    const userDocument = await getDoc(userDocumentReference);

    updateState(userDocument.data());
    console.log(state);
};

export const authenticationSignIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    state.userID = userCredential.user.uid;

    loadPage();
};

export const authenticationSignUp = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    state.userID = userCredential.user.uid;

    const userDocumentReference = doc(db, 'users', state.userID);
    await setDoc(userDocumentReference, {
        name: name,
        email: email,
        cart: {
            total: 0,
            discount: 0,
            subtotal: 0,
            items: [],
        },
    });

    loadPage();
};
