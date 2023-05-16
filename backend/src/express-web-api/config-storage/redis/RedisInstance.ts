import * as redis from "redis";
import RedisStore from "connect-redis";
require('dotenv').config();
class RedisInstance {
     private readonly instance;
     private readonly clientOptions = {
            socket: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT)
            }
     }
     constructor() {
          this.instance = redis.createClient(this.clientOptions);
          this.connect()
     }

     public connect() {

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

    public getInstance() {
        return this.instance;
    }

}

export const redisInstance = new RedisStore({ client: new RedisInstance().getInstance() });