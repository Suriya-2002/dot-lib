import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';

import { router as shopRoutes } from './routes/shop.js';
import { router as authenticationRoutes } from './routes/authentication.js';
import { rootDirectory } from './utilities.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDirectory, 'public')));

app.get('/', shopRoutes);
app.use('/authentication', authenticationRoutes);

app.get('/shop', (req, res, next) => {
    res.render('shop');
});

app.get('/details', (req, res, next) => {
    res.render('details');
});

app.get('/checkout', (req, res, next) => {
    res.render('checkout');
});

app.get('/404', (req, res, next) => {
    res.status(404).render('');
});

app.listen(2002, 'localhost');
