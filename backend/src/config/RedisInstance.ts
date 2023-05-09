const redis = require('redis');
require('dotenv').config();

export class RedisInstance {
    private redisClient;

    constructor() {
        this.redisClient = redis.createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
            }
        });
    }

    public connect() {
        this.redisClient.connect()
            .then(function() {
                console.log('Connected to Redis');

            })
            .catch(function(err) {
                console.error('Error connecting to Redis', err);
            });
    }

    public disconnect() {
        this.redisClient.disconnect()
            .then(function() {
                console.log('Disconnected from Redis');
            })
            .catch(function(err) {
                console.error('Error disconnecting from Redis', err);
            });
    }

    public set(key: string, value: string) {
        this.redisClient.set(key, value, function(err, reply) {
            if (err) {
                console.error('Error setting key ' + key + ' in Redis', err);
            } else {
                console.log('Key ' + key + ' set in Redis');
            }
        });
    }

    public get(key: string) {
        this.redisClient.get(key)
            .then(function(reply) {
                console.log('Key ' + key + ' retrieved from Redis');
                return reply;
            })
            .catch(function(err) {
                console.error('Error getting key ' + key + ' from Redis', err);
            });
    }

}

export const redisInstance = new RedisInstance();


