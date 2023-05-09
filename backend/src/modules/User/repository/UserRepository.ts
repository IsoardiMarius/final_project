import { database } from '../../../config/database';
import { User } from '../index';
import { DatabaseException } from "../../Exception/DatabaseException";

export class UserRepository {
    public async findById(userId: string): Promise<User | null> {

        try {
            const row = await database.query('SELECT * FROM Users WHERE id = ?', [userId]);
            return row[0] || null;
        }

        catch (error) {
            throw new DatabaseException('Error while searching for the user in the database');
        }
    }
}


