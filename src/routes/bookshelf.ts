import express from 'express';
import { Bookshelf } from '../db/models/bookshelf'; // Path to your Bookshelf class

const bookshelfRouter = express.Router();

bookshelfRouter.post('/api/bookshelves', async (req, res) => {
    try {
        const { name, library_id, user_id, organization } = req.body;

        if (!name || !library_id || !user_id) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const bookshelf = await Bookshelf.create(name, library_id, user_id, organization);

        res.status(201).json(bookshelf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the bookshelf' });
    }
});

bookshelfRouter.get('/api/bookshelves/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        const bookshelf = await Bookshelf.getById(id);

        if (!bookshelf) {
            return res.status(404).json({ error: 'Bookshelf not found' });
        }

        res.status(200).json(bookshelf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the bookshelf' });
    }
});


export default bookshelfRouter;
