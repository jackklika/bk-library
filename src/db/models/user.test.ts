import { User } from './user';
import { DB } from '../db';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { createSampleUser } from '../../test_fixtures/user';
import { Bookshelf } from './bookshelf';
import { createSampleLibrary } from '../../test_fixtures/library';

const db = new DB();


describe('User Model', () => {

    afterAll(async () => {
        await db.close();
    });

    test('should create a user', async () => {

            const username = `test-user-${crypto.randomBytes(8).toString("hex") }`;
            const phone_number = '262-751-2483';

            const createdUser = await User.create(username, phone_number);

            expect(createdUser.username).toBe(username);
            expect(createdUser.phone_number).toBe(phone_number);
    });

    test('can get by id', async () => {
        const user = await createSampleUser()

        const found_user = await User.getById(user.id);
        expect(found_user?.id).toBe(user.id);
    });

    test('should have a fixture', async () => {
        const user = await createSampleUser()
        expect(user.username)
        expect(user.phone_number)
    });

    test('can create bookshelves and get them', async () => {
        const user = await createSampleUser()
        const library = await createSampleLibrary()

        var bookshelves = await user.getBookshelves()
        expect(bookshelves.length).toBe(0)

        const created_bookshelf = await Bookshelf.create("test name", library.id, user.id)

        var bookshelves = await user.getBookshelves()
        expect(bookshelves.length).toBe(1)
        expect(bookshelves[0].id).toBe(created_bookshelf.id)
        expect(bookshelves[0].user_id).toBe(user.id)
    });


});