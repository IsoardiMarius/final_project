// Todo: si on supprime les lignes 4 et 5 du fichier PassportLocalStrategy.ts, on obtient une erreur
import { sequelize } from "@sequelize/models";
const Clients = sequelize.models.client

import { ClientType } from './index';
import { DatabaseException } from "@exceptions/DatabaseException";

export class SignupEmailRepository {
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


