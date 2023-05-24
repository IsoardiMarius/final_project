class SignupWithEmailException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CreateAccountException';
    }
}

export class ClientNotFoundException extends SignupWithEmailException {
    constructor(clientId: string) {
        super(`Client with ID ${clientId} not found`);
        this.name = 'ClientNotFoundException';
    }
}