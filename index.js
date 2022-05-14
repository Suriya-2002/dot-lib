import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';

import { router as shopRoutes } from './routes/shop.js';
import { router as authenticationRoutes } from './routes/authentication.js';
import { router as errorRoutes } from './routes/errors.js';
import { rootDirectory } from './utilities.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDirectory, 'public')));

app.use('/', shopRoutes);
app.use('/authentication', authenticationRoutes);
app.use('/', errorRoutes);

app.listen(2002, 'localhost');
