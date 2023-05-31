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
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            (file.slice(-3) === '.js' || file.slice(-3) === '.ts') && // Mettre à jour la condition
            file.indexOf('.test.ts') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.close = async () => {
  await db.sequelize.close()
};

db.clean = async () => {
  // ici on supprime toutes les données de la base de données pour les tests unitaires
  await db.sequelize.sync({ force: true });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
