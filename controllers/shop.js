import fetch from 'node-fetch';

import * as user from './../models/user.js';

export const getIndexPage = async (req, res, next) => {
    try {
        const cart = await user.fetchCartItems();

        user.autoAuthenticateUser(async signedIn => {
            res.render('index', { cart, signedIn });
        });
    } catch (error) {
        throw error;
    }
};

export const postSearchQuery = async (req, res, next) => {
    try {
        const { searchQuery } = req.body;
        const searchResults = await user.fetchBooks(searchQuery);

        const cart = await user.fetchCartItems();

        user.autoAuthenticateUser(async signedIn => {
            res.render('search', { cart, searchQuery, searchResults, signedIn });
        });
    } catch (error) {
        throw error;
    }
};

export const postAddToCart = async (req, res, next) => {
    try {
        const { itemID } = req.body;
        await user.addToCart(itemID);

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

        const cart = await user.fetchCartItems();

        user.autoAuthenticateUser(async signedIn => {
            res.render('details', { cart, itemData, signedIn });
        });
    } catch (error) {
        throw error;
    }
};

export const getCheckoutPage = async (req, res, next) => {
    try {
        const cart = await user.fetchCartItems();

        user.autoAuthenticateUser(async signedIn => {
            res.render('checkout', { cart, signedIn });
        });
    } catch (error) {
        throw error;
    }
};
