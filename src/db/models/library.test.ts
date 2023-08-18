import { createSampleLibrary } from '../../test_fixtures/library';
import { createSampleUser } from '../../test_fixtures/user';
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

    test('can add users and retrieve them by library', async () => {
        const library = await createSampleLibrary()
        const user = await createSampleUser()

        var library_users = await library.getUsers()
        expect(library_users.length).toBe(0)

        await library.addUser(user.id)

        var library_users = await library.getUsers()
        expect(library_users.length).toBe(1)
        expect(library_users[0].id).toBe(user.id)
    })

});