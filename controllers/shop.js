import fetch from 'node-fetch';

import * as user from './../models/user.js';

import bookData from './../models/book-data.json' assert { type: 'json' };

export const getIndexPage = async (req, res, next) => {
    try {
        const cart = await user.fetchCartItems();
        var fictionData = []
        var fictionBestData = []
        var dataNonFiction = []
        var nonFictionBestData = []
    
        var i =0;
        var j =0;   
        
        function sortByProperty(property){  
            return function(a,b){  
               if(parseFloat(a[property]) < parseFloat(b[property]))  
                  return 1;  
               else if(parseFloat(a[property]) > parseFloat(b[property]))  
                  return -1;  
           
               return 0;  
            }  
         }
       
        for (i = 0; i < bookData.length; i++) {

            if (bookData[i].genre == 'fiction') {
                fictionData.push(bookData[i])
                if (fictionData.length== 9) {
                    break;
                }
            }
            
        }
        for (j = 0; j < bookData.length; j++) {

            if (bookData[j].genre == 'Nonfiction') {
                dataNonFiction.push(bookData[j])
                if (dataNonFiction.length == 9) {
                    break;
                }
            }
           
        }

        var data1 = bookData.sort(sortByProperty('rating')) 
       
        
        for (i = 0; i < data1.length; i++) {

            if (data1[i].genre == 'fiction') {
                fictionBestData.push(data1[i])
                if (fictionBestData.length== 9) {
                    break;
                }
            }
            
        }
        for (i = 0; i < data1.length; i++) {

            if (data1[i].genre == 'Nonfiction') {
                nonFictionBestData.push(data1[i])
                if (nonFictionBestData.length== 9) {
                    break;
                }
            }
            
        }
        

        user.autoAuthenticateUser(async signedIn => {
            res.render('index', { cart, signedIn, fiction: fictionData, nonfiction: dataNonFiction, bestFiction: fictionBestData, bestNonFiction: nonFictionBestData });
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
export const getProfileData = async (req, res, next) => {
    try {
        const cart = await user.fetchCartItems();

        user.autoAuthenticateUser(async signedIn => {

            console.log(signedIn)
            res.render('profile', { cart, signedIn });
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
