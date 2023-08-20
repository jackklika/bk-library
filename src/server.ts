import express from 'express';

import bookshelfRouter from './routes/bookshelf';
import authRouter from './routes/auth';
import bookRouter from './routes/book';


const app = express();
const port = process.env.PORT || 1337;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(bookshelfRouter);
app.use(authRouter);
app.use(bookRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
