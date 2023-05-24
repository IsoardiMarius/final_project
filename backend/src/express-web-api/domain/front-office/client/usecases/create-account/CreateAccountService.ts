import {Client, CreateAccountRepository,} from './index';

export class CreateAccountService {
    private readonly repository: CreateAccountRepository;

    constructor(repository: CreateAccountRepository) {
        this.repository = repository;
    }

    async getClientById(clientId: string): Promise<Client | null> {
        const client = await this.repository.findById(clientId);
        return client;
    }
}