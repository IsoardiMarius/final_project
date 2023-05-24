// import { expressApp } from '../src/express-web-api/ExpressApp';
// import { HttpsServer } from '../src/https-server/server';
// // import { databaseConnection } from "../src/express-web-api/config-storage/database/DatabaseInstance";
// import { Client } from "../src/express-web-api/domain/front-office/client/ClientModel";
// let server: HttpsServer;
//
//
//
// beforeAll( () => {
//     if (process.env.NODE_ENV !== 'test') {
//         throw new Error('Unauthorized environment for testing -> NODE_ENV must be "test"');
//     }
//     server = new HttpsServer(expressApp, 3000);
//     server.start();
// });
//
// afterAll(async () => {
//     // databaseConnection.close();
//     await server.stop();
// });
//
// describe('GET /users/:id', () => {
//     const axios = require('axios');
//
//     it('should return user', async () => {
//
//         const response = await axios.get('https://localhost:3000/users/1');
//
//         const newUser = new Client(response.data.id, response.data.firstname, response.data.lastname, response.data.email, response.data.password);
//
//         expect(response.status).toBe(200);
//         expect(newUser).toBeInstanceOf(Client);
//     });
// });
