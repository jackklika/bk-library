import { DB } from '../db';
import { Library } from './library';
import { v4 as uuidv4 } from 'uuid';

const db = new DB();

describe('Library', () => {

    afterAll(async () => {
        await db.close();
    });

    test('should create a library', async () => {
        await Library.create('Sample Library Name');
    });


});