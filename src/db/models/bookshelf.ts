export class Bookshelf {
    id: string;
    name: string;

    library_id: string;
    user_id: string;

    constructor(id: string, name: string, library_id: string, user_id: string) {
        this.id = id
        this.name = name;

        this.library_id = library_id;
        this.user_id = user_id;
    }
}