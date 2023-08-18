import { User } from '../db/models/user';

import crypto from 'crypto';

export async function createSampleUser(): Promise<User> {

    const randomString = crypto.randomBytes(8).toString("hex");
    const username = `test-user-${randomString}`;
    const phone_number = '262-751-2483';

    return await User.create(username, phone_number);
}