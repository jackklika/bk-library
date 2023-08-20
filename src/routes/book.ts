import express from 'express';
import { getBooks, createBookshelf } from '../logic/bookshelf'; 
import { AuthenticatedRequest, authenticate } from './middleware/auth';
import { addToBookshelf, createBook } from '../logic/book';

const bookRouter = express.Router();

bookRouter.post('/api/book', async (req, res) => {
    // Create a book
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const book = await createBook(title)

        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the book' });
    }
});

bookRouter.get('/api/book/:book_id/addToBookshelf/:bookshelf_id', authenticate, async (req: AuthenticatedRequest, res) => {
    /*
    Add book to bookshelf. User must have access to bookshelf.
    */

    try {
        const book_id = req.params.book_id;
        const bookshelf_id = req.params.bookshelf_id;

        if (!req.user_id) {
            return res.status(400).json({ error: 'Authentication is required' });
        }

        if (!bookshelf_id || !book_id) {
            return res.status(400).json({ error: 'IDs are required' });
        }

        await addToBookshelf(book_id, bookshelf_id, req.user_id)

        res.status(200).json("Added book to bookshelf");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding books' });
    }
});

export default bookRouter;
