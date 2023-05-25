import {Client, SignupEmailRepository,} from './index';

export class SignupEmailService {
    private readonly repository: SignupEmailRepository;

    constructor(repository: SignupEmailRepository) {
        this.repository = repository;
    }

    async getClientById(clientId: string): Promise<Client | null> {
        const client = await this.repository.findById(clientId);
        return client;
    }
}