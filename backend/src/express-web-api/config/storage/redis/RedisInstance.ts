require('dotenv').config();
import * as redis from "redis";
import RedisStore from "connect-redis";


//TODO: Voir pour passer redis en tls
class RedisInstance {

     private readonly instance;
     private readonly clientOptions = {
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
             console.log('Connecté à Redis on ' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT);
         });

     }

    public getInstance(): RedisStore {
        return this.instance;
    }

}

export const redisInstance: RedisStore = new RedisStore({ client: new RedisInstance().getInstance() });