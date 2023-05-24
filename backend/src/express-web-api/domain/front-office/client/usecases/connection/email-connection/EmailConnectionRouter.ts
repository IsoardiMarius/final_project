import * as express from 'express';

export class EmailConnectionRouter {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', async (req: any, res: express.Response) => {

                console.log(req.session.passport.user)
                res.send(`Signed in with user: ${req.session.passport.user}`);

        });
    }
}

export const emailConnectionRouter = new EmailConnectionRouter().router;

