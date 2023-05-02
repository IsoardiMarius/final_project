const env = process.env.NODE_ENV;

switch (env) {
    case 'development':
        require('dotenv').config({ path: process.cwd() + '/.env' });
        module.exports = {
            username: process.env.DB_USER,
            password: null,
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT // ajoutez une valeur par défaut pour le dialecte
        };
        break;
    case 'test':
        require('dotenv').config({ path: process.cwd() + '/.env.test' });
        module.exports = {
            username: process.env.DB_USER,
            password: null,
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT
        };
        break;
    default:
        throw new Error(`Unknown environment: ${env}`);
}
