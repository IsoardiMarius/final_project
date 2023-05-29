import { sequelize } from "../../../../../config/storage/sequelize/models"
const ClientModel = sequelize.models.client

import { ClientType } from './index';
import { DatabaseException } from "../../../../../../utils/exceptions/DatabaseException";

export class SignupEmailRepository {
    public async findById(clientId: string): Promise<ClientType | null> {

        try {
            const client = await ClientModel.findByPk(clientId);
            return client;
        }

        catch (error) {
            throw new DatabaseException('Error while searching for the client in the databaseConnection');
        }
    }
}


