import { DB } from '../db'; // Assume this is your DB class
import { v4 as uuidv4 } from 'uuid';

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

}