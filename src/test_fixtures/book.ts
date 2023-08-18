import { Book } from '../db/models/book';

import crypto from 'crypto';

export async function createSampleBook(): Promise<Book> {
    const randomString = crypto.randomBytes(8).toString("hex");
    const title = `test-bookshelf-${randomString}`;

    return await Book.create(title);
}
