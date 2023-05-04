import {User} from '../index';
import db from '../../../database';
import {DatabaseException} from "../../Exception/DatabaseException";

export class UserRepository {
    public async findById(userId: string): Promise<User | null> {

        try {
            const row = await db.query('SELECT * FROM Users WHERE id = ?', [userId]);
            return row[0] || null;
        }

        catch (error) {
            throw new DatabaseException('Error while searching for the user in the database');
        }
    }
}


