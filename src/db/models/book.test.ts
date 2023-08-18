import { DB } from '../db'; // Assume this is your DB class
import { Book } from './book';
import { User } from './user';
import { v4 as uuidv4 } from 'uuid';

const db = new DB();

describe('Book', () => {

    afterAll(async () => {
        await db.close();
    });

    test('should create a book', async () => {
        const book = await Book.create('Sample Title');
        expect(book.title).toBe('Sample Title');
    });

    test('should find a book by id', async () => {
        const title = 'SampleTitle'

        const book_created = await Book.create(title);
        const book_found = await Book.findById(book_created.id);
        expect(book_found?.title).toBe(title);
    });

    //test('should add a book to a bookshelf', async () => {
    //    const bookshelfId = 'bookshelf-id-here'; // Replace with an actual bookshelf ID
    //    await Book.addToBookshelf(bookId, bookshelfId);

    //    // You could add additional checks here to validate the book has been added to the bookshelf
    //});
});
