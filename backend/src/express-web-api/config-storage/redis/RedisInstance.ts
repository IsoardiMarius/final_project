import * as redis from "redis";
import RedisStore from "connect-redis";
require('dotenv').config();

type clientOptions = {
    socket: {
        host: string,
        port: number
    }
}

interface IRedisInstance {
    getInstance(): RedisStore;
    connect(): void;
}

class RedisInstance {

     private readonly instance;
     private readonly clientOptions: clientOptions = {
            socket: {
                host: process.env.REDIS_HOST as string,
                port: Number(process.env.REDIS_PORT)
            }
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
             console.log('Connecté à Redis');
         });

     }

    public getInstance(): RedisStore {
        return this.instance;
    }

}

export const redisInstance: RedisStore = new RedisStore({ client: new RedisInstance().getInstance() });