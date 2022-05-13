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

import { firebaseConfig } from '/js/config.js';

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
const auth = getAuth();
const db = getFirestore();

export const authenticateUserSignIn = async credentials => {
    try {
        const { email, password } = credentials;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        state.userID = userCredential.user.uid;
    } catch (error) {
        throw error;
    }
};

export const authenticateUserSignUp = async credentials => {
    try {
        const { name, email, password } = credentials;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        state.userID = userCredential.user.uid;

        const userDocumentReference = doc(db, 'users', state.userID);
        await setDoc(userDocumentReference, {
            name: name,
            email: email,
            cart: { total: 0, discount: 0, subtotal: 0, items: [] },
        });
    } catch (error) {
        throw error;
    }
};
