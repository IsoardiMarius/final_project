import { Application, Request, Response, NextFunction } from 'express';
import * as express from 'express';
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");
import cors = require("cors");
import db from "./database";

import { UserRoute } from "./modules/User";

export class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json({limit: '501mb'}));
        this.app.use(cookieParser());

        // Ajouter les headers de sécurité
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            // Empêche le clickjacking en utilisant le header X-Frame-Options
            res.setHeader('X-Frame-Options', 'SAMEORIGIN');

            // Empêche le sniffing MIME en utilisant le header X-Content-Type-Options
            res.setHeader('X-Content-Type-Options', 'nosniff');

            // Active la protection XSS en utilisant le header X-XSS-Protection
            res.setHeader('X-XSS-Protection', '1; mode=block');

            // Empêche les attaques CSRF en utilisant le header CSRF-TOKEN
            res.setHeader('CSRF-TOKEN', 'randomly_generated_token');

            next();
        });

        db.connect();

    }

    private routes(): void {
        this.app.use('/users', new UserRoute().router);
    }
}

export const app = new App().app;