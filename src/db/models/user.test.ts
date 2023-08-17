import { User } from './user';
import { DB } from '../db';
import { Pool } from 'pg';

import { v4 as uuidv4 } from 'uuid';

describe('User Model', () => {
    test('should create a user', async () => {

            const gen_id = uuidv4();
            const username = `test-user-${gen_id}`;
            const phone_number = '262-751-2483';

            // Call the create() method
            const createdUser = await User.create(username, phone_number, gen_id);

            // Validate the result
            expect(createdUser.username).toBe(username);
            expect(createdUser.phone_number).toBe(phone_number);
    });
});