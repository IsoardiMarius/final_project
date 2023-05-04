export class UserNotFoundException extends Error {
    constructor(userId: string) {
        const message = `User with ID ${userId} not found`;
        super(message);
        this.name = 'UserNotFoundException';
    }
}