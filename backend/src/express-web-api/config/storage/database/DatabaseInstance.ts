// Si NODE_ENV est à 'test', on utilise le fichier .env.test
if (process.env.NODE_ENV === 'development') require('dotenv').config({ path: process.cwd() + '/.env' });
if (process.env.NODE_ENV === 'test') require('dotenv').config({ path: process.cwd() + '/.env.test' });

const mysql = require('mysql2');

import { DatabaseConfig } from "./DatabaseConfig";



interface IDatabaseConnection {
    connect(): void;
    query(sql: string, values?): Promise<any>;
    close(): void;

}

class DatabaseInstance implements IDatabaseConnection {
    private connection;

    constructor(private config: DatabaseConfig) { }
    public connect(): void {
        this.connection = mysql.createConnection(this.config);
        this.connection.connect((err) => {
            if (err) {
                console.log('Error connecting to Db: ' + err);
                return;
            }
            else console.log("Environnement : " + process.env.NODE_ENV + " -->" + ' Connection established to the databaseConnection ' + this.config.database + ' on ' + this.config.host + ' as ' + this.config.user + '.');
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

// Create a new databaseConnection connection
export const databaseInstance = new DatabaseInstance(new DatabaseConfig(
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_DATABASE,
));