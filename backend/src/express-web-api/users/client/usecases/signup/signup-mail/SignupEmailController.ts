import { ClientType, SignupEmailService, ClientNotFoundException } from './index';

export class SignupEmailController {
    // TODO: Modifier le controller
    private readonly service: SignupEmailService;

    constructor(service: SignupEmailService) {
        this.service = service;
        this.getClientById = this.getClientById.bind(this);
    }

    async getClientById(clientId: string): Promise<ClientType> {
        const client = await this.service.getClientById(clientId);

        if (!client) {
            console.error(`User with ID ${clientId} not found`)
            throw new ClientNotFoundException(clientId);
        }

        else return client;
    }
}
