import { Library } from '../db/models/library';

import crypto from 'crypto';

export async function createSampleLibrary(): Promise<Library> {

    const randomString = crypto.randomBytes(8).toString("hex");
    const name = `test-library-${randomString}`;

    return await Library.create(name);
}