class SignupEmailException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CreateAccountException';
    }
}

export class ClientNotFoundException extends SignupEmailException {
    constructor(clientId: string) {
        super(`Client with ID ${clientId} not found`);
        this.name = 'ClientNotFoundException';
    }
}