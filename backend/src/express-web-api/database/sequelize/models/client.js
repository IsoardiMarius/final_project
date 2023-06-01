module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Client', {
    username: DataTypes.STRING,
    hashed_password: DataTypes.BLOB,
    salt: DataTypes.BLOB,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: DataTypes.INTEGER
  });
}