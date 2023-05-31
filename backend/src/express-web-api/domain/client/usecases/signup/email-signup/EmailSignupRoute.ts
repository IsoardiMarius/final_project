import * as express from 'express';
import { EmailSignupController, EmailSignupRepository, EmailSignupService } from './index';



export class EmailSignupRoute {
    public router = express.Router();
    private controller = new EmailSignupController(new EmailSignupService(new EmailSignupRepository()));

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
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

export const clientRoute = new EmailSignupRoute().router;