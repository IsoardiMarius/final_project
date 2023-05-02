import { Request, Response } from 'express';
import {User, UserService} from '../index';
import { ERROR_NOT_FOUND } from "../../../helpers/error_message";


export class UserController{
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
        this.getUserById = this.getUserById.bind(this);
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        const get_user = await this.userService.getUserById(userId);

        if (!get_user) {
            res.status(404).send("User " + ERROR_NOT_FOUND);
            return;
        }

        const user = new User(get_user.id, get_user.firstname, get_user.lastname, get_user.email, get_user.password);
        res.status(200).json(user);
    }

}
