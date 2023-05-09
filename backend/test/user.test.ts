import { app } from '../src/app';
import { HttpsServer } from '../src/server';
import { database } from "../src/config/database";
import { User } from "../src/modules/User";
let server: HttpsServer;



beforeAll( () => {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Unauthorized environment for testing -> NODE_ENV must be "test"');
    }
    server = new HttpsServer(app, 3000);
    server.start();
});

afterAll(async () => {
    database.close();
    await server.stop();
});

describe('GET /users/:id', () => {
    const axios = require('axios');

    it('should return user', async () => {

        const user = {
            id: 1,
            firstname: "marius",
            lastname: "isoardi",
            email: "marisu@mail.com",
            password: "marius"
        }



        const response = await axios.get('https://localhost:3000/users/1');

        const newUser = new User(response.data.id, response.data.firstname, response.data.lastname, response.data.email, response.data.password);

        expect(response.status).toBe(200);
        expect(newUser).toBeInstanceOf(User);
    });
});
