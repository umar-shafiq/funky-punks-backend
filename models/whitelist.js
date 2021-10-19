'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class whitelist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  whitelist.init({
    address: DataTypes.STRING,
    limit: DataTypes.INTEGER,
    minted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'whitelist',
  });
  return whitelist;
};