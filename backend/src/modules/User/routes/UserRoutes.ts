import * as express from 'express';
import { UserController, UserRepository, UserService } from '../index';



export class UserRoute {
    public router = express.Router();
    private userController = new UserController(new UserService(new UserRepository()));

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/:userId', async (req: express.Request, res: express.Response) => {
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
