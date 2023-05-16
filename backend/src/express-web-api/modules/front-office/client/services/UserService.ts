import {User, UserRepository,} from '../index';

export class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await this.userRepository.findById(userId);
        return user;
    }
}