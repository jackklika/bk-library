import { Bookshelf } from '../db/models/bookshelf';

import crypto from 'crypto';
import { createSampleLibrary } from './library';
import { createSampleUser } from './user';

export async function createSampleBookshelf(): Promise<Bookshelf> {

    const sampleLibrary = await createSampleLibrary()
    const sampleUser = await createSampleUser();

    const randomString = crypto.randomBytes(8).toString("hex");
    const title = `test-bookshelf-${randomString}`;
    const library_id = sampleLibrary.id;

    return await Bookshelf.create(title, library_id, sampleUser.id);
}
