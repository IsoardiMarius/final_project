import {User} from '../index';
import db from '../../../database';

export class UserRepository {

    public async findById(id: string): Promise<User | null> {
        try {
            const user = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
            return user[0];
        }
        catch (e) {
            console.log(e.message);
            return null;
        }
    }

}


