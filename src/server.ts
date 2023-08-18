import express from 'express';

import bookshelfRouter from './routes/bookshelf';


const app = express();
const port = process.env.PORT || 1337;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(bookshelfRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
