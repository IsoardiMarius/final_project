import { DataTypes } from "sequelize";
import { sequelize } from "../config-storage/sequelize/models"

const LocalStrategy = require("passport-local/lib").Strategy;
const passport = require("passport");

const User = require('../config-storage/sequelize/models/user')(sequelize, DataTypes)

module.exports.passportConfig = () => {
    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" },
            async (username, password, done) => {
                const user = await User.findOne({ where: { username: username } })
                if (!user) {
                    console.log("User not found : " + username)
                    return done(null, false, { message: "Invalid credentials.\n" });
                }

                console.log("User connected : " + user.username)

                return done(null, user.id);

            }
        )
    );

    passport.serializeUser(function(user, done) {
        console.log("User serialized : " + user)
        return done(null, user); })

    passport.deserializeUser(function(id, done){
        console.log("User deserialized : ")
        return done(null, User.findOne({ where: { id: id } }))})

};



export class PassportLocalStrategy {

}