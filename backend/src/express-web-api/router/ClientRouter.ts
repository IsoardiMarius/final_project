import express from "express";
import passport from "passport";

import {emailSigninRoute} from "@root/domain/client/usecases/signin/email-signin/EmailSigninRouter";
import {passportAuthMiddleware} from "@root/middlewares/PassportAuthMiddleware";
import {emailSignupRoute} from "@root/domain/client/usecases/signup/email-signup";

export class ClientRouter {
    public router: express.Router;

    constructor() {

        this.router = express.Router();

        this.router.use('/signin_email', passport.authenticate('local'), emailSigninRoute); // https://localhost:3000/api/client/signin
        this.router.use('/signup_email', passportAuthMiddleware, emailSignupRoute); // https://localhost:3000/api/client/signup

    }
}