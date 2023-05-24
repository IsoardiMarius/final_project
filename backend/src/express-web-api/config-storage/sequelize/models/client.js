'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  client.init({
    username: DataTypes.STRING,
    hashed_password: DataTypes.BLOB,
    salt: DataTypes.BLOB,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'client',
  });
  return client;
};