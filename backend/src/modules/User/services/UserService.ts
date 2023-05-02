import {User, UserRepository,} from '../index';

export class UserService{
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

}
