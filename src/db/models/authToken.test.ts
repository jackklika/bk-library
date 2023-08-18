import { AuthToken, DEFAULT_RETRIES_COUNT } from './authToken';
import { DB } from '../db';
import { createSampleUser } from '../../test_fixtures/user';

const db = new DB();


describe('AuthToken', () => {

    afterAll(async () => {
        await db.close();
    });

    test('should create a token', async () => {
        const otp_code = "11233"
        const user = await createSampleUser()

        const token = await AuthToken.create({ otp_code, user_id: user.id })

        expect(token.otp_code).toBe(otp_code);
        expect(token.user_id).toBe(user.id);
        expect(token.expiry)
        expect(token.retries).toBe(DEFAULT_RETRIES_COUNT)
    })

});