const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.js');
const db = {};
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);
sequelize.authenticate().then(() => {
    console.log('Connecte to database ' + config.database + ' on ' + config.host + ":" + config.port);
})
.catch(err => {
    console.error('Unable to connect to the databaseConnection:', err);
});



fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
