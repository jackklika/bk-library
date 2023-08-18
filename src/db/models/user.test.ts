import { User } from './user';
import { DB } from '../db';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { createSampleUser } from '../../test_fixtures/user';

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

    test('should have a fixture', async () => {
        const user = await createSampleUser()
        expect(user.username)
        expect(user.phone_number)
    });
});