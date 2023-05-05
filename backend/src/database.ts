const mysql = require('mysql2');

if (process.env.NODE_ENV === 'development') require('dotenv').config({ path: process.cwd() + '/.env' });
if (process.env.NODE_ENV === 'test') require('dotenv').config({ path: process.cwd() + '/.env.test' });



// Define the database connection configuration
export class DatabaseConfig {
    host: string;
    user: string;
    database: string;
    password: string;

    constructor(host: string, user: string, database: string) {
        this.host = host;
        this.user = user;
        this.database = database;
    }
}

// Define the database connection interface
export interface IDatabaseConnection {
    connect(): void;
    query(sql: string, values?: any): Promise<any>;
    close(): void;
}

// Define the concrete implementation of the database connection
export class DatabaseConnection implements IDatabaseConnection {
    private connection: any;

    constructor(private config: DatabaseConfig) {}
    public connect(): void {
        this.connection = mysql.createConnection(this.config);
        this.connection.connect((err) => {
            if (err) {
                console.log('Error connecting to Db: ' + err);
                return;
            }
            else console.log("Environnement : " + process.env.NODE_ENV + " -->" + ' Connection established to the database ' + this.config.database + ' on ' + this.config.host + ' as ' + this.config.user + '.');
        });
    }

    public async query(sql: string, values?): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    public close(): void {
        this.connection.end();
    }

}

// Create a new database connection
const db = new DatabaseConnection(new DatabaseConfig(
    // si NODE_ENV est à 'test', on utilise la base de données de test
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_DATABASE,
));

export {};
export default db;
