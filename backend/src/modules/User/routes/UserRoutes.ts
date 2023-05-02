import * as express from 'express';
import { UserController, UserRepository, UserService } from '../index';


export class UserRoute {
    public router = express.Router();
    private userController = new UserController(new UserService(new UserRepository()));

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/:userId', this.userController.getUserById)
    }
}
