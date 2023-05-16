import { Application } from 'express';
import * as https from "https";
import * as fs from "fs";
import { app } from "../express-web-api/app";

export class HttpsServer {

    private app: Application;
    private readonly port: number;
    private server: https.Server | null

    constructor(app: Application, port: number) {
        this.app = app;
        this.port = port;
        this.server = null;
    }

    public start() {
        const options = {
            key: fs.readFileSync(process.env.SSL_KEY_PATH as string),
            cert: fs.readFileSync(process.env.SSL_CERT_PATH as string)
        };

        this.server = https.createServer(options, this.app).listen(this.port, () => {
            console.log('Server started on port ' + this.port);
        });
    }

    public stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close((err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log('Server stopped');
                        resolve();
                    }
                });
            } else {
                console.error('Server not running');
                resolve();
            }
        });
    }
}

const server = new HttpsServer(app, 3000);
// comment this line to run the tests
server.start();
