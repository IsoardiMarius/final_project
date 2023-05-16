require('dotenv').config();
import { Application, Request, Response, NextFunction } from 'express';
import express from "express";
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");
import cors from "cors";
const session = require('express-session');
const passport = require('passport');

const { passportConfig } = require("./passportjs-authentication/passport-local-strategy");
import { database } from "./config-storage/database/database";
import { redisInstance } from "./config-storage/redis/RedisInstance";

import { UserRoute } from "./modules/front-office/client";

class App {
    public app: Application;

    private readonly sessionOptions = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: redisInstance,
    }

    constructor() {
        this.app = express();
        //TODO: renommer les fonctions pour plus de clarté
        this.config();
        this.session();
        this.routes();
        this.databaseConnect();
    }

    private config(): void {

        // Ici les données envoyées par le client sont parsées pour pouvoir être utilisées avec req.body
        this.app.use(bodyParser.json({limit: '501mb'}));
        // Ici les cookies sont parsés pour pouvoir être utilisés avec req.cookies
        this.app.use(cookieParser(process.env.SESSION_SECRET));


        // Autoriser les requêtes cross-origin (CORS) pour pouvoir utiliser l'API depuis un autre domaine
        this.app.use(cors());
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

    private session(): void {
        passportConfig();
        this.app.use(session(this.sessionOptions));
        this.app.use(passport.authenticate('session'));
    }


    //TODO: clean les routes
    private routes(): void {
            this.app.use('/users', new UserRoute().router);
            this.app.use('/signin',   passport.authenticate('local'), (req: any, res: Response) => {
                console.log(req.session.passport.user)
                res.send(`Signed in with user: ${req.session.passport.user}`);
            });

        const requireAuth = (req: any, res: Response, next: NextFunction) => {
            if (req.isAuthenticated()) {
                return next();
            } else {
                return res.status(401).send("UnauthorizedDx");
            }
        };

        this.app.get('/info', requireAuth, (req: any, res) => {
            const id = req.session.passport.user;
            console.log(req.session.passport.user)
            res.send(`La valeur de maInfo est ${id}`);
        });
        }

        //TODO: lever le databaseConnect() pour le deporter dans son propre module
    private databaseConnect(): void {
        database.connect();
    }

}

export const app = new App().app;
