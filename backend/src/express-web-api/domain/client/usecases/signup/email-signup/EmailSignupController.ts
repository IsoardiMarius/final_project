import { ClientType, EmailSignupService, ClientNotFoundException } from './index';

export class EmailSignupController {
    private readonly service: EmailSignupService;

    constructor(service: EmailSignupService) {
        this.service = service;
        this.getClientById = this.getClientById.bind(this);
    }

    async getClientById(clientId: string): Promise<ClientType> {
        const client = await this.service.getClientById(clientId);

        if (!client) {
            throw new ClientNotFoundException(clientId);
        }

        else return client;
    }
}
