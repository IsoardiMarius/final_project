import { Application, Request, Response, NextFunction } from 'express';
import * as express from 'express';
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");
import cors = require("cors");
const session = require('express-session');
import passport = require('passport');
import RedisStore from "connect-redis";

import { database } from "./config/database";
import { redisInstance } from "./config/RedisInstance";

import { UserRoute } from "./modules/User";

export class App {
    public app: Application;

    private sessionOptions = {
        store: new RedisStore({ client: redisInstance }),
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.databaseConnect();
        this.redisConnect();
    }

    private config(): void {

        this.app.use(cors());
        this.app.use(bodyParser.json({limit: '501mb'}));
        this.app.use(cookieParser());
        this.app.use(session(this.sessionOptions));
        this.app.use(passport.authenticate('session'));

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

    }

    private routes(): void {
        this.app.use('/users', new UserRoute().router);
    }

    private databaseConnect(): void {
        database.connect();
    }

    private redisConnect(): void {
        redisInstance.connect();
    }

}

export const app = new App().app;