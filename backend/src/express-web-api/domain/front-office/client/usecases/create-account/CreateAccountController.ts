import { Client, CreateAccountService, ClientNotFoundException } from './index';

export class CreateAccountController {
    private readonly service: CreateAccountService;

    constructor(service: CreateAccountService) {
        this.service = service;
        this.getClientById = this.getClientById.bind(this);
    }

    async getClientById(clientId: string): Promise<Client> {
        const client = await this.service.getClientById(clientId);

        if (!client) {
            console.error(`User with ID ${clientId} not found`)
            throw new ClientNotFoundException(clientId);
        }

        else return client;
    }
}
