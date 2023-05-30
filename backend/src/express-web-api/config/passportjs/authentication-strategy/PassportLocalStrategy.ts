const LocalStrategy = require("passport-local/lib").Strategy;
const passport = require("passport");

import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/storage/sequelize/models"
const ClientModel = require('../../storage/sequelize/models/client')(sequelize, DataTypes)

//TODO: Voir comment simplifier l'import des models
// si on utilise Clients et qu'on lève les lignes 4 et 5, on obtient une erreur
const Clients = sequelize.models.clients

export class PassportLocalStrategy {
    private readonly passport: any;
    private readonly LocalStrategy: any;

    constructor(passport: any, LocalStrategy: any) {
        this.passport = passport;
        this.LocalStrategy = LocalStrategy;
    }

    // Todo: modifier la stratégie
    public initialize(): void {
        this.passport.use(
            new this.LocalStrategy(
                { usernameField: "username", passwordField: "password" },

                async (username: string, password: string, done: any) => {

                    const user = await ClientModel.findOne({ where: { username: username } })

                    if (!user) {
                        console.log("User not found : " + username)
                        return done(null, false, { message: "Invalid credentials.\n" });
                    }

                    console.log("User connected : " + user.username)

                    return done(null, user.id);

                })
        );

        this.passport.serializeUser(function(user: any, done: any) {

            return done(null, user);
        })

        this.passport.deserializeUser(function(id: any, done: any){

            const user = ClientModel.findByPk(id)

            return done(null, user)
        })
    }

}

export const passportLocalStrategy = new PassportLocalStrategy(passport, LocalStrategy)
