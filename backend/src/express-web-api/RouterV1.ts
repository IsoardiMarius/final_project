import express from "express";
import passport from "passport";

import { passportLocalAuthMiddleware } from "./middlewares/PassportLocalMiddleware";

import { clientRoute } from "./domain/front-office/client/usecases/signup/signup-with-mail";
import { emailConnectionRoute } from "./domain/front-office/client/usecases/connection/email-connection/EmailConnectionRouter";


// TODO: voir comment simplifier tous cela
export class RouterV1 {
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

export const routerV1 = new RouterV1().router;