import { sequelize } from "../../../../../config/storage/sequelize/models"
import {DataTypes} from "sequelize";

const Clients = require('../../../../../../config-storage/sequelize/models/client')(sequelize, DataTypes)
import { Client } from './index';
import { DatabaseException } from "../../../../../../utils/exceptions/DatabaseException";


export class SignupEmailRepository {
    public async findById(clientId: string): Promise<Client | null> {

        try {
            const client = await Clients.findByPk(clientId);
            return client;
        }

        catch (error) {
            throw new DatabaseException('Error while searching for the client in the databaseConnection');
        }
    }
}


