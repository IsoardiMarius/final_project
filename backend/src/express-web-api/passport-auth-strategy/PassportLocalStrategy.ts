/*

    Ce fichier configure une stratégie d'authentification locale Passport en utilisant la stratégie LocalStrategy.
    Lorsque l'utilisateur tente de s'authentifier, et que le middleware Passport authentifie les requêtes à l'aide de la stratégie locale,
    il appelle la fonction de rappel de la stratégie avec les informations d'identification fournies.

    Dans ce cas, la fonction de rappel est définie comme une fonction asynchrone qui recherche l'utilisateur dans la base de données.
    La fonction de rappel reçoit le nom d'utilisateur et le mot de passe entrés par l'utilisateur.

    Elle recherche l'utilisateur correspondant dans la base de données en utilisant le modèle Clients.
    Si l'utilisateur est trouvé, il est considéré comme authentifié et l'identifiant de l'utilisateur est renvoyé.

    Sinon, une erreur est renvoyée.

    Le fichier exporte également une instance de PassportLocalStrategy pour être utilisée
    dans d'autres fichiers de l'application.

*/

const LocalStrategy = require("passport-local/lib").Strategy;
const passport = require("passport");

import { DataTypes } from "sequelize";
import { sequelize } from "@root/database/sequelize/models"
const Clients = require('@root/database/sequelize/models/client')(sequelize, DataTypes)

export class PassportLocalStrategy {
    private readonly passport: any;
    private readonly LocalStrategy: any;

    constructor(passport: any, LocalStrategy: any) {
        this.passport = passport;
        this.LocalStrategy = LocalStrategy;
    }

    // La fonction done est un callback fourni par Passport. Elle est utilisée pour indiquer à Passport que l'opération
    // de sérialisation ou de désérialisation est terminée et pour passer le contrôle à Passport pour
    // qu'il puisse continuer à traiter la demande.

    // Lorsqu'elle est appelée avec des arguments null et user (done(null, user)),
    // cela indique à Passport que l'opération s'est déroulée avec succès et que l'objet utilisateur (user)
    // doit être stocké dans la session (dans le cas de la sérialisation) ou associé à req.user (dans le cas de la désérialisation).

    // Si une erreur se produit lors de la sérialisation ou de la désérialisation, on peut appeler done avec l'erreur en premier argument (done(erreur))
    // pour indiquer à Passport qu'une erreur s'est produite et qu'elle doit être gérée de manière appropriée.

    // En résumé, la fonction done est utilisée pour notifier Passport du statut de l'opération de sérialisation ou de désérialisation,
    // et pour transmettre les résultats (l'utilisateur ou une éventuelle erreur) à Passport pour qu'il puisse
    // continuer le flux de traitement de l'authentification.

    public initialize(): void {
        this.passport.use(
            new this.LocalStrategy(

                // On définit les champs qui serviront à l'authentification
                { usernameField: "username", passwordField: "password" },

                async (username: string, password: string, done: any) => {

                    const user = await Clients.findOne({ where: { username: username } })

                    // Si l'utilisateur n'est pas trouvé, on renvoie une erreur et req.isAuthenticated() renvoie false
                    // ( voir PassportAuthMiddleware.ts )
                    if (!user) {
                        console.log("User not found : " + username)
                        return done(null, false, { message: "Invalid credentials.\n" });
                    }

                    console.log("User connected : " + user.username)
                    /* Si l'utilisateur est trouvé, req.isAuthenticated() renvoie true.
                       L'id de l'utilisateur est stocké dans la session (Redis) et peut être récupéré
                       ultérieurement en utilisant req.session.passport.user */
                    return done(null, user.id);

                })
        );

        // serializeUser est une méthode fournie par Passport qui permet de déterminer
        // quelles données utilisateur doivent être stockées dans la session.
        this.passport.serializeUser(function(user: any, done: any) {

            return done(null, user);
        })

        // deserializeUser est une méthode fournie par Passport qui permet de récupérer les
        // informations utilisateur à partir de la session et de les associer à l'objet
        // req.user dans les requêtes suivantes.
        this.passport.deserializeUser(function(id: any, done: any){

            const user = Clients.findByPk(id)

            return done(null, user)
        })
    }

}

export const passportLocalStrategy: PassportLocalStrategy = new PassportLocalStrategy(passport, LocalStrategy)
