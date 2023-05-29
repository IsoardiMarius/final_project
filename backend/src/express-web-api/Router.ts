import express from "express";
import passport from "passport";

import { passportLocalAuthMiddleware } from "./middlewares/PassportLocalMiddleware";

import { clientRoute } from "./users/client/usecases/signup/signup-mail";
import { emailConnectionRoute } from "./users/client/usecases/connection/email-connection/EmailConnectionRouter";


// TODO: voir comment simplifier tous cela
export class Router {
    public router: express.Router;
    constructor() {

        this.router = express.Router();

        // --------- ClientType routes ---------

        this.router.use('/client/signin', passport.authenticate('local'), emailConnectionRoute);

        this.router.use('/client', passportLocalAuthMiddleware, clientRoute );

        this.router.use('/client/signup', clientRoute);

        // --------- Admin routes ---------

    }
}

export const router = new Router().router;