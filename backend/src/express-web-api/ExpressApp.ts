// https://www.geeksforgeeks.org/how-to-have-path-alias-in-node-js/
require('module-alias/register')
require('dotenv').config();

import express from "express";
import { Application, Request, Response, NextFunction } from 'express';

// Middlewares
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");
import cors from "cors";
import morgan from 'morgan';

// Session
const session = require('express-session');
const passport = require('passport');

import { passportLocalStrategy } from "@config/passportjs/authentication-strategy/PassportLocalStrategy";
import { redisInstance } from "@config/storage/redis/RedisInstance";
import { router } from "./Router";


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
        this.setRoutes();
    }

    private configureBasicMiddlewares(): void {

        // Ici les données envoyées par le client sont parsées pour pouvoir être utilisées avec req.body
        this.app.use(bodyParser.json({limit: '501mb'}));

        // Ici les cookies sont parsés pour pouvoir être utilisés avec req.cookies
        this.app.use(cookieParser(process.env.SESSION_SECRET));

        // Ici les requêtes CORS sont autorisées si l'origine est le frontend en production ou si l'origine est n'importe quelle adresse en développement
        this.app.use(cors({
            origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*',
        }));

        // Logger les requêtes HTTP dans la console
        this.app.use(morgan('dev'))

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

    private setRoutes(): void {

        this.app.use('/api/v1', router);

    }

}

export const expressApp = new ExpressApp().app;
