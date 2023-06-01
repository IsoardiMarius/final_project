/*

   Ce fichier configure et démarre un serveur HTTPS pour l'application.
   Il utilise la classe HttpsServer pour créer un serveur HTTPS en utilisant les certificats SSL fournis.

   Il est configuré avec l'application expressApp et est démarré sur le port spécifié.
   Il écoute les requêtes HTTPS et gère les connexions sécurisées pour l'application.

*/

import { Application } from 'express';
import * as https from "https";
import * as fs from "fs";

import { expressApp } from "../express-web-api/ExpressApp";

export class HttpsServer {

    private app: Application;
    private readonly port: number;
    private server: https.Server | null

    constructor(app: Application, port: number) {
        this.app = app;
        this.port = port;
        this.server = null;
    }

    // Cette méthode démarre le serveur HTTPS
    public start() {
        // options pour le serveur HTTPS (certificats SSL)
        const options = {
            key: fs.readFileSync(process.env.SSL_KEY_PATH as string),
            cert: fs.readFileSync(process.env.SSL_CERT_PATH as string)
        };

        // Démarrage du serveur HTTPS
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

// Création d'une instance de serveur HTTPS
const https_server = new HttpsServer(expressApp, Number(process.env.SERVER_HTTPS_PORT) );
// comment this line to run the tests
https_server.start();
