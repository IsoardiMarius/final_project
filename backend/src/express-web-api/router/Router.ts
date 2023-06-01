/*

  Ce fichier contient le routeur principal de l'application (Router),
  ainsi que les routeurs spécifiques aux administrateurs (AdminRouter) et aux clients (ClientRouter).

  Toutes les routes de l'application seront importées dans ce fichier et montées sur le routeur principal.

  Les routes pour les clients comprennent la connexion, l'inscription et d'autres fonctionnalités
  spécifiques aux clients.
  Les routes pour les administrateurs concernent principalement la gestion de l'application.

  Ce fichier facilitera séparation des routes et permet une gestion modulaire des fonctionnalités
  pour les différents types d'utilisateurs.

*/

import express from "express";

import {ClientRouter} from "./ClientRouter";
import {AdminRouter} from  "./AdminRouter";

class Router {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        const clientRouter = new ClientRouter().router;
        const adminRouter = new AdminRouter().router;

        this.router.use('/client', clientRouter);
        this.router.use('/admin', adminRouter);
    }
}

export const router = new Router().router;
