import {Client, SignupWithEmailRepository,} from './index';

export class SignupWithEmailService {
    private readonly repository: SignupWithEmailRepository;

    constructor(repository: SignupWithEmailRepository) {
        this.repository = repository;
    }

    async getClientById(clientId: string): Promise<Client | null> {
        const client = await this.repository.findById(clientId);
        return client;
    }
}