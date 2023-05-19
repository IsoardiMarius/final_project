import {User, CreateAccountRepository,} from './index';

export class CreateAccountService {
    private readonly userRepository: CreateAccountRepository;

    constructor(userRepository: CreateAccountRepository) {
        this.userRepository = userRepository;
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await this.userRepository.findById(userId);
        return user;
    }
}