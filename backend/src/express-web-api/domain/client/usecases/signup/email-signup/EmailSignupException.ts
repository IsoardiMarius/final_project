class EmailSignupException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CreateAccountException';
    }
}

export class ClientNotFoundException extends EmailSignupException {
    constructor(clientId: string) {
        super(`Client with ID ${clientId} not found`);
        this.name = 'ClientNotFoundException';
    }
}