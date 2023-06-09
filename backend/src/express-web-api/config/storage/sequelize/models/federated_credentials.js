'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Federated_credentials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Federated_credentials.init({
    user_id: DataTypes.STRING,
    provider: DataTypes.TEXT,
    subject: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'federated_credentials',
  });
  return Federated_credentials;
};