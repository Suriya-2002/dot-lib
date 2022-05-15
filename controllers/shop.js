import fs from 'fs';
import path from 'path';

import fetch from 'node-fetch';
import axios from 'axios';

import { rootDirectory, asyncForEach } from './../utilities.js';

const fetchBooks = async searchQuery => {
    try {
        const maxResults = 9;
        const URL = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=${maxResults}`;
        const response = await axios.get(URL);

        return response.data;
    } catch (error) {
        throw error;
    }
};

const fetchCartItems = async () => {
    try {
        const fileContents = await fs.promises.readFile(path.join(rootDirectory, 'state.json'));
        const { cart } = JSON.parse(fileContents);

        await asyncForEach(cart.items, async (item, index) => {
            const response = await fetch(item);
            const itemData = await response.json();

            cart.items[index] = itemData;
        });

        return cart;
    } catch (error) {
        throw error;
    }
};

export const getIndexPage = async (req, res, next) => {
    try {
        const cart = await fetchCartItems();
        res.render('index', { cart });
    } catch (error) {
        throw error;
    }
};

export const postSearchQuery = async (req, res, next) => {
    try {
        const { searchQuery } = req.body;
        const searchResults = await fetchBooks(searchQuery);

        const cart = await fetchCartItems();

        res.render('search', { cart, searchQuery, searchResults });
    } catch (error) {
        throw error;
    }
};

export const getDetailsPage = async (req, res, next) => {
    try {
        const cart = await fetchCartItems();
        res.render('details', { cart });
    } catch (error) {
        throw error;
    }
};

export const getCheckoutPage = async (req, res, next) => {
    try {
        const cart = await fetchCartItems();
        res.render('checkout', { cart });
    } catch (error) {
        throw error;
    }
};
