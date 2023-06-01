require('dotenv').config();

import * as redis from "redis";
import RedisStore from "connect-redis";
import fs from "fs";

class RedisInstance {

     private readonly instance;
     private readonly clientOptions = {
        socket: {
            host: process.env.REDIS_HOST as string,
            port: Number(process.env.REDIS_PORT),
            tls: true,
            //Todo:T04 -> quand on commente la ligne suivante, on a une erreur de certificat
            rejectUnauthorized: false,
            cert: fs.readFileSync(process.env.REDIS_CERT_PATH as string),
            key: fs.readFileSync(process.env.REDIS_KEY_PATH as string),
            ca: fs.readFileSync(process.env.REDIS_CA_PATH as string)
        },
         user: process.env.REDIS_USER as string,
         // password: process.env.REDIS_PASSWORD as string
     }
     constructor() {
          this.instance = redis.createClient(this.clientOptions);
          this.connect()
     }

     private connect(): void {

         this.instance.connect()
             .catch(function(err) {
             console.log('Erreur de connexion à Redis');
             console.log(err.message);
             process.exit(1);
         });

         this.instance.on('connect', function() {
             console.log('Connecté à Redis on ' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT);
         });

     }

    public getInstance(): RedisStore {
        return this.instance;
    }

}

export const redisInstance: RedisStore = new RedisStore({ client: new RedisInstance().getInstance() });