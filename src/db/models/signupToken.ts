import { getUTCDateHoursFromNow } from '../../utils/time';
import { DB } from '../db'; // Assume this is your DB class
import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_EXPIRY_HOURS = 1
export const DEFAULT_RETRIES_COUNT = 3

const db = new DB();

export class SignupToken {
    /*
    Generated when a user signs up
    */

    id: string
    otp_code: string
    expiry: Date
    retries: number // total amount of retries, decrements with each failed attempt

    phone_number: string

    constructor(id: string, otp_code: string, expiry: Date, retries: number, phone_number: string) {
        this.id = id
        this.otp_code = otp_code
        this.expiry = expiry
        this.retries = retries

        this.phone_number = phone_number
    }

    static async create({ phone_number, retries = DEFAULT_RETRIES_COUNT, expiry = getUTCDateHoursFromNow(DEFAULT_EXPIRY_HOURS) }: 
    { phone_number: string, retries?: number, expiry?: Date }): Promise<SignupToken> {

        const id = uuidv4();  
        const otp_code = "11233" // todo randomly generate

        await db.query(
            'INSERT INTO signup_tokens (id, otp_code, expiry, retries, phone_number) VALUES ($1, $2, $3, $4, $5)',
            [id, otp_code, expiry, retries, phone_number]
        );
        return new SignupToken(id, otp_code, expiry, retries, phone_number);
    }

    static async getByPhoneNumber(phone_number: string): Promise<SignupToken | null> {
        const result = await db.query(
            'SELECT * FROM signup_tokens WHERE phone_number = $1',
            [phone_number]
        );

        if (result.rows.length === 0) {
            return null
        }
        else {
            const row = result.rows[0];
            return new SignupToken(row.id, row.otp_code, row.expiry, row.retries, row.phone_number);
        }
    }

    static async deleteById(id: string): Promise<void> {
        await db.query(
            'DELETE FROM signup_tokens WHERE id = $1',
            [id]
        );
    }

    static async decrementRetries(phone_number: string): Promise<SignupToken | null> {
        /*
        Decrements retries and deletes if no retries are left.
        */
        const result = await db.query(
            'UPDATE signup_tokens SET retries = retries - 1 WHERE phone_number = $1 RETURNING *',
            [phone_number]
        );

        const row = result.rows[0];
        if (!row) {
            return null
        } else if (row.retries === 0) {
            await this.deleteById(row.id)
            return null
        } else {
            return new SignupToken(row.id, row.otp_code, row.expiry, row.retries, row.phone_number);
        }
    }
}