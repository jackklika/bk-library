import { getUTCDateHoursFromNow } from '../../utils/time';
import { DB } from '../db'; // Assume this is your DB class
import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_EXPIRY_HOURS = 1
export const DEFAULT_RETRIES_COUNT = 3

const db = new DB();

export class AuthToken {
    /*
    Generated when a user authenticates
    */

    id: string
    otp_code: string
    expiry: Date
    retries: number // total amount of retries, decrements with each failed attempt

    user_id: string

    constructor(id: string, otp_code: string, expiry: Date, retries: number, user_id: string) {
        this.id = id
        this.otp_code = otp_code
        this.expiry = expiry
        this.retries = retries

        this.user_id = user_id
    }

    static async create({ user_id, retries = DEFAULT_RETRIES_COUNT, expiry = getUTCDateHoursFromNow(DEFAULT_EXPIRY_HOURS) }: 
    { user_id: string, retries?: number, expiry?: Date }): Promise<AuthToken> {

        const id = uuidv4();  
        const otp_code = "11233" // todo randomly generate

        await db.query(
            'INSERT INTO auth_tokens (id, otp_code, expiry, retries, user_id) VALUES ($1, $2, $3, $4, $5)',
            [id, otp_code, expiry, retries, user_id]
        );
        return new AuthToken(id, otp_code, expiry, retries, user_id);
    }

    static async delete(id: string, user_id: string): Promise<void> {
        await db.query(
            'DELETE FROM auth_tokens WHERE id = $1 and user_id = $2',
            [id, user_id]
        );
    }

    static async findByUserId(user_id: string): Promise<AuthToken[]> {
        const result = await db.query(
            `SELECT * FROM auth_tokens WHERE user_id = $1 AND expiry > (NOW() at time zone 'utc')`,
            [user_id]
        );

        return result.rows.map(row => new AuthToken(row.id, row.otp_code, row.expiry, row.retries, row.user_id));
    }

    static async decrementRetries(id: string): Promise<AuthToken | null> {
        const result = await db.query(
            'UPDATE auth_tokens SET retries = retries - 1 WHERE id = $1 RETURNING *',
            [id]
        );

        const row = result.rows[0];
        if (row) {
            return new AuthToken(row.id, row.otp_code, row.expiry, row.retries, row.user_id);
        } else {
            return null; 
        }
    }
}