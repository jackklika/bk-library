import {DB} from '../db';

const db = new DB();

export class User {
    id?: string; //uuid
    username: string;
    password: string;

    constructor(id: string, username: string, password: string) {
        this.id = id
        this.username = username;
        this.password = password;
    }

    static async create(user: User): Promise<User> {
        const res = await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [user.username, user.password]
        );
        const createdUser = new User(res.rows[0].id, res.rows[0].username, res.rows[0].password);
        return createdUser;
    }
}
