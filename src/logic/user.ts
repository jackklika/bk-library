import { User } from "../db/models/user";

export async function createUser(username: string, phone_number: string): Promise<User> {
    return await User.create(username, phone_number)
}