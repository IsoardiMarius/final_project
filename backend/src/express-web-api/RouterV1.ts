import express from "express";
import passport from "passport";

import { passportLocalAuthMiddleware } from "./middlewares/PassportLocalMiddleware";

import { clientRoute } from "./domain/front-office/client/usecases/create-account";
import { emailConnectionRouter } from "./domain/front-office/client/usecases/connection/email-connection/EmailConnectionRouter";



export class RouterV1 {
    public router: express.Router;
    constructor() {

        this.router = express.Router();

        this.router.use('/client/signin', passport.authenticate('local'), emailConnectionRouter);

        this.router.use('/client', passportLocalAuthMiddleware, clientRoute );

        this.router.use('/client/signup', clientRoute);

    }
}

export const routerV1 = new RouterV1().router;