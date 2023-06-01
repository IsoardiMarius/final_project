import {ClientType, EmailSignupRepository,} from './index';

export class EmailSignupService {
    private readonly repository: EmailSignupRepository;

    constructor(repository: EmailSignupRepository) {
        this.repository = repository;
    }

    async getClientById(clientId: string): Promise<ClientType | null> {
        return await this.repository.findById(clientId);
    }
}