import { AuthToken, DEFAULT_RETRIES_COUNT } from './authToken';
import { DB } from '../db';
import { createSampleUser } from '../../test_fixtures/user';

const db = new DB();


describe('AuthToken', () => {

    afterAll(async () => {
        await db.close();
    });

    test('should create a token', async () => {
        const user = await createSampleUser()

        const token = await AuthToken.create({ user_id: user.id })

        expect(token.otp_code)
        expect(token.user_id).toBe(user.id);
        expect(token.expiry)
        expect(token.retries).toBe(DEFAULT_RETRIES_COUNT)
    })

});