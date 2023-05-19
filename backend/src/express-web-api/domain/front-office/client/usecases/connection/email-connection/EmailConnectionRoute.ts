import * as express from 'express';
const passport = require('passport');

export class EmailConnectionRoute {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', passport.authenticate('local'), async (req: any, res: express.Response) => {

                console.log(req.session.passport.user)
                res.send(`Signed in with user: ${req.session.passport.user}`);

        });
    }
}

