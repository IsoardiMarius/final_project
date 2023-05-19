import {User, CreateAccountService, UserNotFoundException} from './index';

export class CreateAccountController {
    private readonly userService: CreateAccountService;

    constructor(userService: CreateAccountService) {
        this.userService = userService;
        this.getUserById = this.getUserById.bind(this);
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userService.getUserById(userId);

        if (!user) {
            console.error(`User with ID ${userId} not found`)
            throw new UserNotFoundException(userId);
        }

        else return user;
    }
}
