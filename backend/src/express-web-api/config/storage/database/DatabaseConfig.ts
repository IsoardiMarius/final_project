
export class DatabaseConfig  {
    host: string;
    user: string;
    database: string;

    constructor(host: string, user: string, database: string) {
        this.host = host;
        this.user = user;
        this.database = database;
    }
}