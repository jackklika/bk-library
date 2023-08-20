import express from 'express';
import { getBooks, createBookshelf } from '../logic/bookshelf'; 
import { AuthenticatedRequest, authenticate } from './middleware/auth';

const bookshelfRouter = express.Router();

bookshelfRouter.post('/api/bookshelves', async (req, res) => {
    try {
        const { name, library_id, user_id, organization } = req.body;

        if (!name || !library_id || !user_id) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const bookshelf = await createBookshelf(name, library_id, user_id, organization);

        res.status(201).json(bookshelf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the bookshelf' });
    }
});

bookshelfRouter.get('/api/bookshelves/:id/books', authenticate, async (req: AuthenticatedRequest, res) => {
    /*
    Get all books in a bookshelf. User must have access to bookshelf.
    */

    try {
        const bookshelf_id = req.params.id;

        if (!req.user_id) {
            return res.status(400).json({ error: 'Authentication is required' });
        }

        if (!bookshelf_id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        const books = await getBooks(bookshelf_id, req.user_id);

        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the bookshelf' });
    }
});


export default bookshelfRouter;
