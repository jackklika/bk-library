import { DB } from '../db';
import { v4 as uuidv4 } from 'uuid';

const db = new DB();

export class Bookshelf {
    id: string;
    name: string;
    organization: string; // todo: should be enum

    library_id: string;
    user_id: string;

    constructor(id: string, name: string, organization: string, library_id: string, user_id: string) {
        this.id = id
        this.name = name;
        this.organization = organization;

        this.library_id = library_id;
        this.user_id = user_id;
    }

    static async create(name: string, library_id: string, user_id: string, organization: string = "SEQUENTIAL"): Promise<Bookshelf> {
        const id = uuidv4();
        await db.query(
            'INSERT INTO bookshelves (id, name, organization, library_id, user_id) VALUES ($1, $2, $3, $4, $5)',
            [id, name, organization, library_id, user_id]
        );
        return new Bookshelf(id, name, organization, library_id, user_id);
    }

    static async getById(id: string): Promise<Bookshelf | null> {
        const res = await db.query(
            'SELECT id, name, organization, library_id, user_id FROM bookshelves WHERE id = $1',
            [id]
        );
        const bookshelf = new Bookshelf(
            res.rows[0].id, 
            res.rows[0].name, 
            res.rows[0].organization, 
            res.rows[0].library_id, 
            res.rows[0].user_id
        );
        console.log(bookshelf)
        return bookshelf

    }
}