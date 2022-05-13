import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import bodyParser from 'body-parser';

import { router as authenticationRoutes } from './routes/authentication.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

app.get('/', (req, res, next) => {
    res.render('index');
});

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
