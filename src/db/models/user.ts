import {DB} from '../db';
import { v4 as uuidv4 } from 'uuid';

const db = new DB();

export class User {
    id: string; //uuid
    username: string;
    phone_number: string;

    constructor(id: string, username: string, phone_number: string) {
        this.id = id
        this.username = username
        this.phone_number = username;
    }

    static async create(username: string, password: string, phone_number: str, id: string = uuidv4()): Promise<User> {

        const res = await db.query(
            'INSERT INTO users (id, username, phone_number) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, username, phone_number]
        );
        const createdUser = new User(res.rows[0].id, res.rows[0].username, res.rows[0].phone_number);
        return createdUser;
    }

    static async getById(id: string): Promise<User> {
        const res = await db.query(
            'SELECT (id, username, phone_number) FROM users WHERE id = $1',
            [id]
        );
        const foundUser = new User(res.rows[0].id, res.rows[0].username, res.rows[0].phone_number);
        return foundUser;
    }
}
