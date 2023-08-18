import { DB } from '../db'; // Assume this is your DB class
import { v4 as uuidv4 } from 'uuid';

const db = new DB();

export class Book {
    /*
    In a real-world application, we would need a robust system to match books between isbns.
    Many books have multiple isbns, and we would generally want a way to match this book model
        to the books in a library.
    */

    id: string;
    title: string

    constructor(id: string, title: string) {
        this.id = id
        this.title = title;
    }

    static async create(title: string): Promise<Book> {
        const id = uuidv4();
        await db.query(
            'INSERT INTO books (id, title) VALUES ($1, $2)',
            [id, title]
        );
        return new Book(id, title);
    }

    static async findById(id: string): Promise<Book | null> {
        const res = await db.query('SELECT * FROM books WHERE id = $1', [id]);
        if (res.rows.length === 0) return null;
        const row = res.rows[0];
        return new Book(row.id, row.title);
    }

    static async findByUser(userId: string): Promise<Book[]> {
        const res = await db.query(
            'SELECT b.* FROM books b INNER JOIN bookshelf_book bb ON b.id = bb.book_id INNER JOIN bookshelves bs ON bb.bookshelf_id = bs.id WHERE bs.user_id = $1',
            [userId]
        );
        return res.rows.map(row => new Book(row.id, row.title));
    }

    static async addToBookshelf(bookId: string, bookshelfId: string): Promise<void> {
        await db.query(
            'INSERT INTO bookshelf_book (book_id, bookshelf_id) VALUES ($1, $2)',
            [bookId, bookshelfId]
        );
    }
}