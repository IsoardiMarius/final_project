import * as express from 'express';
import { CreateAccountController, CreateAccountRepository, CreateAccountService } from './index';
import {passportLocalAuthMiddleware} from "../../../../../middlewares/PassportLocalMiddleware";



export class UserRoute {
    public router = express.Router();
    private userController = new CreateAccountController(new CreateAccountService(new CreateAccountRepository()));

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/:userId', passportLocalAuthMiddleware, async (req: express.Request, res: express.Response) => {
            try {

                const { userId } = req.params;
                const user = await this.userController.getUserById(userId);
                res.status(200).json(user);

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

export const userRoute = new UserRoute().router;
