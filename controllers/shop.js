import fetch from 'node-fetch';

import * as user from './../models/user.js';

export const getIndexPage = async (req, res, next) => {
    try {
        const fictionBooks = await user.fetchBooksByGenre('fiction');
        const romanceBooks = await user.fetchBooksByGenre('romance');
        let cart;

        user.autoAuthenticateUser(async signedIn => {
            if (signedIn) cart = await user.fetchCartItems();
            res.render('index', { cart, signedIn, fictionBooks, romanceBooks });
        });
    } catch (error) {
        throw error;
    }
};

export const postSearchQuery = async (req, res, next) => {
    try {
        const { searchQuery } = req.body;
        const searchResults = await user.fetchBooks(searchQuery);

        let cart;

        user.autoAuthenticateUser(async signedIn => {
            if (signedIn) cart = await user.fetchCartItems();
            res.render('search', { cart, searchQuery, searchResults, signedIn });
        });
    } catch (error) {
        throw error;
    }
};

export const postAddToCart = async (req, res, next) => {
    try {
        const { itemID, price } = req.body;

        const discountPercentage = 10;
        const discount = (Number(price) * Number(discountPercentage)) / 100;

        await user.addToCart({ itemID, price, discount });

        res.redirect(`/details/${itemID}`);
    } catch (error) {
        throw error;
    }
};

export const getDetailsPage = async (req, res, next) => {
    try {
        const { itemID } = req.params;
        const URL = `https://www.googleapis.com/books/v1/volumes/${itemID}`;

        const response = await fetch(URL);
        const itemData = await response.json();

        let cart;

        user.autoAuthenticateUser(async signedIn => {
            if (signedIn) cart = await user.fetchCartItems();
            res.render('details', { cart, itemData, signedIn });
        });
    } catch (error) {
        throw error;
    }
};

export const getProfileData = async (req, res, next) => {
    try {
        let cart;

        user.autoAuthenticateUser(async signedIn => {
            if (signedIn) cart = await user.fetchCartItems();
            res.render('profile', { cart, signedIn });
        });
    } catch (error) {
        throw error;
    }
};
