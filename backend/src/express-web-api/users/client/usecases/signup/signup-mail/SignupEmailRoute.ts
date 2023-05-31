import * as express from 'express';
import { SignupEmailController, SignupEmailRepository, SignupEmailService } from './index';



export class SignupEmailRoute {
    public router = express.Router();
    private controller = new SignupEmailController(new SignupEmailService(new SignupEmailRepository()));

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/:clientId', async (req: express.Request, res: express.Response) => {
            try {

                const { clientId } = req.params;
                const client = await this.controller.getClientById(clientId);
                res.status(200).json(client);

            } catch (error) {

                if (error.name === 'ClientNotFoundException') {
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

export const clientRoute = new SignupEmailRoute().router;