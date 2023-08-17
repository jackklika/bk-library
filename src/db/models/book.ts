export class Book {
    /*
    In a real-world application, we would need a robust system to match books between isbns.
    Many books have multiple isbns, and we would generally want a way to match this book model
        to the books in a library.
    */

    id: string;
    title: string
    organization: string; // todo: make enum

    // todo: set a default organization
    constructor(id: string, title: string, organization: string) {
        this.id = id
        this.title = title;
        this.organization = organization
    }
}