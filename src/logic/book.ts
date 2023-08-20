import { Book } from "../db/models/book";
import { Bookshelf } from "../db/models/bookshelf";

export async function createBook(title: string, library_id?: string): Promise<Book> {
    return await Book.create(title);
}

export async function getBook(id: string): Promise<Book | null> {
    return await Book.findById(id);
}

export async function addToBookshelf(book_id: string, bookshelf_id: string, user_id: string): Promise<void> {

    const bookshelf = await Bookshelf.getById(bookshelf_id);
    if (!bookshelf) {
        throw new Error("Bookshelf not found");
    }
    if (bookshelf.user_id !== user_id) {
        throw new Error("Bookshelf does not belong to user");
    }

    return await Book.addToBookshelf(book_id, bookshelf_id);
}