import {NextFunction, Response} from "express";

class PassportLocalAuthMiddleware {

    public static authentication = (req: any, res: Response, next: NextFunction ) => {

        if (req.isAuthenticated()) {
            return next();
        }

        else {
            return res.status(401).send("UnauthorizedDx");
        }
    }
}

export const passportLocalAuthMiddleware = PassportLocalAuthMiddleware.authentication;

