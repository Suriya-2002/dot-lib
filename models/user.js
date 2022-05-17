import fs from 'fs';
import path from 'path';

import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import axios from 'axios';

import { rootDirectory, asyncForEach } from './../utilities.js';

const firebaseConfig = {
    apiKey: 'AIzaSyC0Knk7W5pfY4eRlM0vNMbYznV47fBHAuY',
    authDomain: 'dot-lib.firebaseapp.com',
    projectId: 'dot-lib',
    storageBucket: 'dot-lib.appspot.com',
    messagingSenderId: '811914504552',
    appId: '1:811914504552:web:87399527dc7c99d52a8edd',
    measurementId: 'G-D438YFH6TJ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const updateState = async () => {
    try {
        const userID = auth.currentUser.uid;
        const userDocumentReference = doc(db, 'users', userID);
        const userDocument = await getDoc(userDocumentReference);

        await fs.promises.writeFile(
            path.join(rootDirectory, 'state.json'),
            JSON.stringify(userDocument.data())
        );
    } catch (error) {
        throw error;
    }
};

export const authenticationSignIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        await updateState();
    } catch (error) {
        throw error;
    }
};

export const authenticationSignUp = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userID = userCredential.user.uid;

        const userDocumentReference = doc(db, 'users', userID);
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

        await updateState();
    } catch (error) {
        throw error;
    }
};

export const fetchCartItems = async () => {
    try {
        const fileContents = await fs.promises.readFile(path.join(rootDirectory, 'state.json'));
        const { cart } = JSON.parse(fileContents);

        await asyncForEach(cart.items, async (item, index) => {
            const URL = `https://www.googleapis.com/books/v1/volumes/${item}`;
            const itemData = await axios.get(URL);

            cart.items[index] = itemData.data;
        });

        return cart;
    } catch (error) {
        throw error;
    }
};

export const addToCart = async itemID => {
    try {
        const userID = auth.currentUser.uid;
        const userDocumentReference = doc(db, 'users', userID);

        await updateDoc(userDocumentReference, {
            'cart.total': 1000,
            'cart.discount': 100,
            'cart.subtotal': 1100,
            'cart.items': arrayUnion(itemID),
        });

        await updateState();
    } catch (error) {
        throw error;
    }
};

export const fetchBooks = async searchQuery => {
    try {
        const maxResults = 9;
        const URL = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=${maxResults}`;
        const response = await axios.get(URL);

        return response.data;
    } catch (error) {
        throw error;
    }
};
