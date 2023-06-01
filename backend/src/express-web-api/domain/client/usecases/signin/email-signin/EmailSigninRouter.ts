import * as express from 'express';

export class EmailSigninRoute {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', async (req: any, res: express.Response) => {

                console.log(req.session.passport.user)
                res.send(`Signed in with user: ${req.session.passport.user}`);

        });
    }
}

export const emailSigninRoute = new EmailSigninRoute().router;

