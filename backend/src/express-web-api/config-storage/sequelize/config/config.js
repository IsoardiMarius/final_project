
const env = process.env.NODE_ENV;

switch (env) {
    case 'development':
        require('dotenv').config({path:__dirname+'/../../../../../.env'});
        break;
    case 'test':
        require('dotenv').config({path:__dirname+'/../../../../../.env.test'});
        break;
    case 'production':
        require('dotenv').config({path:__dirname+'/../../../../../.env.production'});
        break;
    default:
        throw new Error('NODE_ENV environment variable must be set to "development", "test" or "production"');

}

module.exports = {
            "username": process.env.DB_USER,
            "password": null,
            "database": process.env.DB_DATABASE,
            "host": process.env.DB_HOST,
            "dialect": process.env.DB_DIALECT
}




