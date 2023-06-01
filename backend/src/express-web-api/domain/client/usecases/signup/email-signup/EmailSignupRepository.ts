import { DataTypes } from "sequelize";
import { sequelize } from "@root/database/sequelize/models"
const Clients = require('@root/database/sequelize/models/client')(sequelize, DataTypes)

import { ClientType } from './index';
import { DatabaseException } from "@exceptions/DatabaseException";

export class EmailSignupRepository {
    public async findById(clientId: string): Promise<ClientType | null> {

        try {
            const client = await Clients.findByPk(clientId);
            return client;
        }

        catch (error) {
            throw new DatabaseException('Error while searching for the client in the databaseConnection');
        }
    }
}


