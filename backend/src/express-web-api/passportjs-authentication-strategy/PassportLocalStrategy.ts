const LocalStrategy = require("passport-local/lib").Strategy;
const passport = require("passport");

//TODO: Voir comment simplifier l'import des models
//Et voir comment faire du sequelize-typescript
import { DataTypes } from "sequelize";
import { sequelize } from "../config-storage/sequelize/models"
const Client = require('../config-storage/sequelize/models/client')(sequelize, DataTypes)

export class PassportLocalStrategy {
    private readonly passport: any;
    private readonly LocalStrategy: any;

    constructor(passport: any, LocalStrategy: any) {
        this.passport = passport;
        this.LocalStrategy = LocalStrategy;
    }

    public initialize(): void {
        this.passport.use(
            new this.LocalStrategy(
                { usernameField: "username", passwordField: "password" },

                async (username: string, password: string, done: any) => {

                    const user = await Client.findOne({ where: { username: username } })

                    if (!user) {
                        console.log("User not found : " + username)
                        return done(null, false, { message: "Invalid credentials.\n" });
                    }

                    console.log("User connected : " + user.username)

                    return done(null, user.id);

                })
        );

        this.passport.serializeUser(function(user: any, done: any) {

            console.log("User serialized : " + user)

            return done(null, user);
        })

        this.passport.deserializeUser(function(id: any, done: any){

            const user = Client.findByPk(id)

            return done(null, user)
        })
    }

}

export const passportLocalStrategy = new PassportLocalStrategy(passport, LocalStrategy)
