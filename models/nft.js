'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NFT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  NFT.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    body: DataTypes.STRING,
    bottom: DataTypes.STRING,
    footwear: DataTypes.STRING,
    top: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NFT',
  });
  return NFT;
};