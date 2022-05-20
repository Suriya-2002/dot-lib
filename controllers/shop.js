import fetch from 'node-fetch';

import * as user from './../models/user.js';

export const getIndexPage = async (req, res, next) => {
    try {
        const fictionBooks = await user.fetchBooksByGenre('fiction');
        const romanceBooks = await user.fetchBooksByGenre('romance');
        const nonFictionBooks = await user.fetchBooksByGenre('nonfiction');
        const healthBooks = await user.fetchBooksByGenre('health');
        const actionBooks = await user.fetchBooksByGenre('action');
        const scienceBooks = await user.fetchBooksByGenre('science');
        const thrillerBooks = await user.fetchBooksByGenre('thriller');
        const mysteryBooks = await user.fetchBooksByGenre('mystery');
        const historyBooks = await user.fetchBooksByGenre('history');
        
        const fantasyBooks = await user.fetchBooksByGenre('fantasy');
        let cart;

        user.autoAuthenticateUser(async signedIn => {
            if (signedIn) cart = await user.fetchCartItems();
            res.render('index', { cart, signedIn, fictionBooks, romanceBooks, nonFictionBooks, healthBooks, actionBooks,mysteryBooks,historyBooks, scienceBooks, thrillerBooks, fantasyBooks });
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

        await user.addToCart({ itemID, price: Number(price), discount });

        res.redirect('/');
    } catch (error) {
        throw error;
    }
};

export const postDeleteCartItem = async (req, res, next) => {
    try {
        const { itemID, price } = req.body;

        const discountPercentage = 10;
        const discount = (Number(price) * Number(discountPercentage)) / 100;

        await user.deleteCartItem({ itemID, price, discount });
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

export const paymetPage = async (req,res,next) => {
        try {
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
              const storeItem = storeItems.get(item.id)
              return {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: storeItem.name,
                  },
                  unit_amount: storeItem.priceInCents,
                },
              
              }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`,
          })
          res.json({ url: session.url })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      };
