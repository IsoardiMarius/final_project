import * as express from 'express';
import { CreateAccountController, CreateAccountRepository, CreateAccountService } from './index';
import {passportLocalAuthMiddleware} from "../../../../../middlewares/PassportLocalMiddleware";



export class CreateAccountRoute {
    public router = express.Router();
    private controller = new CreateAccountController(new CreateAccountService(new CreateAccountRepository()));

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/:clientId', passportLocalAuthMiddleware, async (req: express.Request, res: express.Response) => {
            try {

                const { clientId } = req.params;
                const client = await this.controller.getClientById(clientId);
                res.status(200).json(client);

            } catch (error) {

                if (error.name === 'UserNotFoundException') {
                    console.error('An error occurred:', error)
                    res.status(404).send(error.message);
                }

                if (error.name === 'DatabaseException') {
                    console.error('An error occurred:', error);
                    res.status(500).send(error.message);
                }

            }
        });
    }
}

export const clientRoute = new CreateAccountRoute().router;