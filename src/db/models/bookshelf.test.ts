import { createSampleBookshelf } from '../../test_fixtures/bookshelf';
import { createSampleLibrary } from '../../test_fixtures/library';
import { createSampleUser } from '../../test_fixtures/user';
import { DB } from '../db'; 
import { Bookshelf } from './bookshelf';
import { v4 as uuidv4 } from 'uuid';

const db = new DB();

describe('Bookshelf', () => {
    let bookId: string;

    afterAll(async () => {
        await db.close();
    });

    test('should create a bookshelf', async () => {
        const sampleName = "Sample Bookshelf Title";
        const sampleLibrary = await createSampleLibrary();
        const sampleUser = await createSampleUser();

        const bookshelf = await Bookshelf.create(sampleName, sampleLibrary.id, sampleUser.id);

        expect(bookshelf.name).toBe(sampleName);
        expect(bookshelf.user_id).toBe(sampleUser.id);
        expect(bookshelf.library_id).toBe(sampleLibrary.id);
    });

    test('can find by id', async () => {
        const bookshelf = await createSampleBookshelf();

        const found_bookshelf = await Bookshelf.getById(bookshelf.id);
        expect(found_bookshelf?.id).toBe(bookshelf.id);
        expect(found_bookshelf?.name).toBe(bookshelf.name);
    });

    test('should have fixture', async () => {
        const bookshelf = await createSampleBookshelf();
        expect(bookshelf.id);
        expect(bookshelf.name);
        expect(bookshelf.user_id);
        expect(bookshelf.library_id);
    });

    //test('should find a book by id', async () => {
    //    const sample_title = 'Sample Title';
    //    await Book.create(sample_title);

    //    const book_found = await Book.findById(bookId);
    //    expect(book_found?.title).toBe(sample_title);
    //});

    //test('should add a book to a bookshelf', async () => {
    //    const bookshelfId = 'bookshelf-id-here';
    //    await Book.addToBookshelf(bookId, bookshelfId);

    //});
});
