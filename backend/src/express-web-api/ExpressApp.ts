/*

    Ce fichier configure l'application Express pour qu'elle soit prête à être utilisée par le serveur HTTPS.

    On configure l'application Express avec les middlewares de base tels
    que l'analyseur de corps JSON, l'analyseur de cookies ect ...

    On ajoute des en-têtes de sécurité pour prévenir les attaques,
    initialise les stratégies d'authentifications pour la connexion des utilisateurs et
    configure la session des utilisateurs.

    On monte également les routes principales de l'application sur l'application Express.

    Ce fichier est appelé par le fichier src/https-server/server.ts à la racine du dossier src.

*/

// Importation des modules et configuration initiale
require('module-alias/register');
require('dotenv').config();

import express from "express";
import { Application, Request, Response, NextFunction } from 'express';
const treblle = require('@treblle/express')

// Middlewares basic config
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");
import cors from "cors";
import morgan from 'morgan';

// Session
const session = require('express-session');
const passport = require('passport');

import { passportLocalStrategy } from "@root/passport-auth-strategy/PassportLocalStrategy";
import { redisInstance } from "@root/database/redis/RedisInstance";
import { router } from "./router/Router";

class ExpressApp {
    public app: Application;

    private readonly sessionOptions = {
        secret: process.env.SESSION_SECRET, // Clé secrète pour signer les cookies de session
        resave: false, // Ne pas sauvegarder la session à chaque requête
        saveUninitialized: false, // Ne pas sauvegarder les sessions non initialisées
        store: redisInstance, // Utilisation de Redis pour le stockage de session
    }

    constructor() {
        this.app = express();
        this.configureBasicMiddlewares(); // Configuration des middlewares de base
        this.setSecurityHeaders(); // Configuration des headers de sécurité
        this.initializeSession(); // Initialisation de la session
        this.setRoutes(); // Configuration des routes
    }

    // Configuration des middlewares de base
    private configureBasicMiddlewares(): void {
        this.app.use(bodyParser.json({limit: '501mb'})); // Rend les données JSON disponibles dans les requêtes (req.body)
        this.app.use(cookieParser(process.env.SESSION_SECRET)); // Rend les cookies disponibles dans les requêtes (req.cookies)
        this.app.use(cors({
            origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*', // Configuration CORS
        }));
        this.app.use(morgan('dev')); // Journalisation des requêtes HTTP (on voit les requêtes dans la console)
        this.app.use( // Trebble sert à monitorer, documenter et debugger notre APIs.
            treblle({
                apiKey: process.env.TREBLLE_API_KEY,
                projectId: process.env.TREBLLE_PROJECT_ID,
                additionalFieldsToMask: [],
            })
        )
    }

    // Configuration des headers de sécurité
    private setSecurityHeaders(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Empêche le clickjacking
            res.setHeader('X-Content-Type-Options', 'nosniff'); // Empêche le sniffing MIME
            res.setHeader('X-XSS-Protection', '1; mode=block'); // Active la protection XSS
            res.setHeader('CSRF-TOKEN', 'randomly_generated_token'); // Protection CSRF
            next();
        });
    }

    // Initialisation de la session
    private initializeSession(): void {
        passportLocalStrategy.initialize(); // Initialisation de la stratégie d'authentification locale avec Passport.js
        this.app.use(session(this.sessionOptions)); // Configuration du middleware de session
        this.app.use(passport.authenticate('session')); // Authentification des utilisateurs pendant la session
    }

    // Configuration des routes
    private setRoutes(): void {
        this.app.use('/api', router); // Montage des routes principales sur l'application
    }
}

// Exportation de l'application Express pour le serveur HTTPS
export const expressApp: Application = new ExpressApp().app;
