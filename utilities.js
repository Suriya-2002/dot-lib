import path from 'path';
import { fileURLToPath } from 'url';

export const rootDirectory = path.dirname(fileURLToPath(import.meta.url));

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};
