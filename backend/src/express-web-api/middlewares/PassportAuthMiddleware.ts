/*

    Ce fichier contient un middleware d'authentification Passport pour les routes Express.

    Le middleware vérifie si l'utilisateur est authentifié en utilisant la fonction isAuthenticated() de Passport.

    Si l'utilisateur est authentifié, la requête est transmise au prochain middleware ou à la route suivante.
    Sinon, une réponse avec un statut 401 (non autorisé) est renvoyée.

    Ce middleware est exporté sous le nom passportAuthMiddleware pour être utilisé
    dans d'autres fichiers de l'application.

*/

import {NextFunction, Response} from "express";

class PassportAuthMiddleware {

    public static authentication = (req: any, res: Response, next: NextFunction ) => {

        if (req.isAuthenticated()) {
            return next();
        }

        else {
            return res.status(401).send("Unauthorized !");
        }
    }
}

export const passportAuthMiddleware = PassportAuthMiddleware.authentication;

