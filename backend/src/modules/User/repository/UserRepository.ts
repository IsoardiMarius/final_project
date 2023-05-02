import {User} from '../index';
import db from '../../../database';
import {DatabaseException} from "../../Exception";

export class UserRepository {
    public async findById(userId: string): Promise<User | null> {

        try {
            const user = await db.query('SELECT * FROM Users WHERE id = ?', [userId]);
            return user[0] || null;
        }

        catch (error) {
            throw new DatabaseException('Error while searching for the user in the database');
        }
    }
}


