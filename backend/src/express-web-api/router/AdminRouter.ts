import express from "express";

import {emailSignupRoute} from "@root/domain/client/usecases/signup/email-signup";

export class AdminRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.use('/', emailSignupRoute); // https://localhost:3000/api/admin
    }
}