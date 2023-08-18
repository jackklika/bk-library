import { DB } from '../db'; // Assume this is your DB class
import { v4 as uuidv4 } from 'uuid';
import { User } from './user';

const db = new DB();
export class Library {
    id: string; //uuid
    name: string;

    constructor(id: string, name: string) {
        this.id = id
        this.name = name;
    }

    static async create(name: string): Promise<Library> {
        const id = uuidv4();
        await db.query(
            'INSERT INTO libraries (id, name) VALUES ($1, $2)',
            [id, name]
        );
        return new Library(id, name);
    }

    async addUser(user_id: string): Promise<void> {
        await db.query(
            'INSERT INTO library_user (library_id, user_id) VALUES ($1, $2)',
            [this.id, user_id]
        );
    }

    async getUsers(): Promise<User[]> {
        const res = await db.query(
            'SELECT u.* FROM users u INNER JOIN library_user lu ON u.id = lu.user_id WHERE lu.library_id = $1',
            [this.id]
        );
        return res.rows.map(row => new User(row.id, row.username, row.phone_number));
    }

}