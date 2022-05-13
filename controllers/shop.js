import fs from 'fs';
import path from 'path';

import fetch from 'node-fetch';

import { rootDirectory, asyncForEach } from './../utilities.js';

export const getIndexPage = async (req, res, next) => {
    try {
        const fileContents = await fs.promises.readFile(path.join(rootDirectory, 'state.json'));
        const { cart } = JSON.parse(fileContents);

        await asyncForEach(cart.items, async (item, index) => {
            const response = await fetch(item);
            const itemData = await response.json();

            cart.items[index] = itemData;
        });

        res.render('index', { cart });
    } catch (error) {
        throw error;
    }
};
