export class ClientNotFoundException extends Error {
    constructor(clientId: string) {
        const message = `User with ID ${clientId} not found`;
        super(message);
        this.name = 'ClientNotFoundException';
    }
}