import { SignupToken, DEFAULT_RETRIES_COUNT } from './signupToken';
import { DB } from '../db';

const db = new DB();

function generateRandomPhoneNumber(): string {
    const areaCode = Math.floor(Math.random() * 900 + 100);
    const prefix = Math.floor(Math.random() * 900 + 100);
    const lineNumber = Math.floor(Math.random() * 9000 + 1000);

    return `${areaCode}-${prefix}-${lineNumber}`;
}


describe('SignupToken', () => {

    afterAll(async () => {
        await db.close();
    });

    test('should create a token', async () => {
        const phone_number = generateRandomPhoneNumber();

        const token = await SignupToken.create({ phone_number: phone_number })

        expect(token.otp_code)
        expect(token.phone_number).toBe(phone_number);
        expect(token.expiry)
        expect(token.retries).toBe(DEFAULT_RETRIES_COUNT)
    })

});