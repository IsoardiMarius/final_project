import { sequelize } from "../../../../../config-storage/sequelize/models"
import {DataTypes} from "sequelize";

const Users = require('../../../../../config-storage/sequelize/models/user')(sequelize, DataTypes)
import { User } from './index';
import { DatabaseException } from "../../../../../../utils/exceptions/DatabaseException";


export class CreateAccountRepository {
    public async findById(userId: string): Promise<User | null> {

        try {
            const user = await Users.findByPk(userId);
            return user;
        }

        catch (error) {
            throw new DatabaseException('Error while searching for the user in the databaseConnection');
        }
    }
}


