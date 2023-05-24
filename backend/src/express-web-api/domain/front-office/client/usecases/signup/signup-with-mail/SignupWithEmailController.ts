import { Client, SignupWithEmailService, ClientNotFoundException } from './index';

export class SignupWithEmailController {
    private readonly service: SignupWithEmailService;

    constructor(service: SignupWithEmailService) {
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
