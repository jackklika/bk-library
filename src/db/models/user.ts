import {DB} from '../db';
import { v4 as uuidv4 } from 'uuid';
import { Bookshelf } from './bookshelf';
import { Library } from './library';

const db = new DB();

export class User {
    id: string; //uuid
    username: string;
    phone_number: string;

    constructor(id: string, username: string, phone_number: string) {
        this.id = id
        this.username = username
        this.phone_number = phone_number;
    }

    static async create(username: string, phone_number: string): Promise<User> {

        const id = uuidv4();

        const res = await db.query(
            'INSERT INTO users (id, username, phone_number) VALUES ($1, $2, $3) RETURNING *',
            [id, username, phone_number]
        );
        const createdUser = new User(res.rows[0].id, res.rows[0].username, res.rows[0].phone_number);
        return createdUser;
    }

    static async getById(id: string): Promise<User | null> {
        const res = await db.query(
            'SELECT id, username, phone_number FROM users WHERE id = $1',
            [id]
        );
        if (res.rows.length === 0){
            return null
        }

        const foundUser = new User(res.rows[0].id, res.rows[0].username, res.rows[0].phone_number);
        return foundUser;
    }

    async getBookshelves(): Promise<Bookshelf[]> {
        /*
        Get the user's bookshelves.
        */
        const res = await db.query(
            'SELECT * FROM bookshelves WHERE user_id = $1',
            [this.id]
        );
        return res.rows.map(row => new Bookshelf(row.id, row.name, row.organization, row.library_id, row.user_id));
    }

    async getLibraries(): Promise<Library[]> {
        /*
        Get the user's libraries.
        */
        const res = await db.query(
            'SELECT l.* FROM libraries l INNER JOIN library_user lu ON l.id = lu.library_id WHERE lu.user_id = $1',
            [this.id]
        );
        return res.rows.map(row => new Library(row.id, row.name));

    }
}
