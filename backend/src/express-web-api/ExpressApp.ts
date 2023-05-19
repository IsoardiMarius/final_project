require('dotenv').config();

import express from "express";
import { Application, Request, Response, NextFunction } from 'express';
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");
import cors from "cors";
const session = require('express-session');
const passport = require('passport');

import { passportLocalStrategy } from "./passportjs-authentication/PassportLocalStrategy";
import { passportLocalAuthMiddleware } from "./middlewares/PassportLocalMiddleware";
import { redisInstance } from "./config-storage/redis/RedisInstance";
// import { databaseInstance } from "./config-storage/databaseConnection/databaseConnection";

import { EmailConnectionRoute } from "./domain/front-office/client/usecases/connection/email-connection/EmailConnectionRoute";
import { ClientRoute } from "./domain/front-office/client/usecases/create-account";

//TODO: Clean package npm
class ExpressApp {
    public app: Application;

    private readonly sessionOptions = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: redisInstance,
    }

    constructor() {
        this.app = express();
        this.configureBasicMiddlewares();
        this.setSecurityHeaders();
        // databaseConnection.connect();
        this.initializeSession();
        this.setupRoutes();
    }

    private configureBasicMiddlewares(): void {

        // Ici les données envoyées par le client sont parsées pour pouvoir être utilisées avec req.body
        this.app.use(bodyParser.json({limit: '501mb'}));

        // Ici les cookies sont parsés pour pouvoir être utilisés avec req.cookies
        this.app.use(cookieParser(process.env.SESSION_SECRET));

        // Autoriser les requêtes cross-origin (CORS) pour pouvoir utiliser l'API depuis un autre domaine
        this.app.use(cors());

    }

    private setSecurityHeaders(): void {

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

    private initializeSession(): void {
        passportLocalStrategy.initialize();
        this.app.use(session(this.sessionOptions));
        this.app.use(passport.authenticate('session'));
    }

    //TODO: Faire en sorte d'exporter les route pour rendre modulable
    private setupRoutes(): void {

        const clientRoute = new ClientRoute().router;

        const emailConnectionRoute = new EmailConnectionRoute().router;


        this.app.use('/signin', emailConnectionRoute);

        this.app.use('/users', clientRoute );

        this.app.get('/info', passportLocalAuthMiddleware, (req: any, res) => {
            const id = req.session.passport.user;
            res.send(`La valeur de maInfo est ${id}`);
        });

    }

}

export const expressApp = new ExpressApp().app;
