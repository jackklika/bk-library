import { Book } from "../db/models/book";
import { Bookshelf, DEFAULT_BOOKSHELF_ORGANIZATION } from "../db/models/bookshelf";
import { User } from "../db/models/user";

export async function getBooks(bookshelf_id: string, user_id: string): Promise<{ success: boolean, error?: string, books?: Book[] }> {
    /*
    Get all books in a bookshelf.

    The bookshelf must be owned by the user.

    todo:
    - Create response with Bookshelf and Books
    */

    const user = await User.getById(user_id)
    if (!user) {
        return {success: false, error: "User not found"}
    }

    const bookshelf = await Bookshelf.getById(bookshelf_id)
    if (!bookshelf) {
        return {success: false, error: "Bookshelf not found"}
    }

    const user_libraries = await user.getLibraries()
    if (user_libraries.length === 0) {
        return {success: false, error: "User has no libraries"}
    }

    if (!user_libraries.some(library => library.id === bookshelf.library_id)) {
        return { success: false, error: "Bookshelf does not belong to user" };
    }

    return { success: true, books: await bookshelf.getBooks() }
    
}

export async function createBookshelf(name: string, library_id: string, user_id: string, organization: string = DEFAULT_BOOKSHELF_ORGANIZATION): Promise<Bookshelf> {
    return await Bookshelf.create(name, library_id, user_id, organization);
}

export async function addBook(bookshelf_id: string, book_id: string): Promise<void> {
    const bookshelf = await Bookshelf.getById(bookshelf_id)
    if (!bookshelf) {
        throw new Error("Bookshelf not found")
    }
    return await bookshelf.addBookById(book_id)
}
