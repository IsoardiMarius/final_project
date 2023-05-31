import express from "express";
import passport from "passport";

import { passportLocalAuthMiddleware } from "./middlewares/PassportLocalMiddleware";

import { clientRoute } from "./domain/client/usecases/signup/email-signup";
import { emailConnectionRoute } from "./domain/client/usecases/connection/email-connection/EmailConnectionRouter";
import {DataTypes} from "sequelize";
import {sequelize} from "./config/storage/sequelize/models";
require("@sequelize/models/client")(sequelize, DataTypes)


export class Router {
    public router: express.Router;
    constructor() {

        this.router = express.Router();

        // --------- Client routes ---------

        this.router.use('/client/signin', passport.authenticate('local'), emailConnectionRoute);

        this.router.use('/client', passportLocalAuthMiddleware, clientRoute );

        this.router.use('/client/signup', clientRoute);

        // --------- Admin routes ---------

    }
}

export const router = new Router().router;