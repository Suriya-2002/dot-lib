const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/authentication', (req, res, next) => {
    res.render('authentication');
});

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
