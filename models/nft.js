"use strict";
const { Model } = require("sequelize");
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
  }
  NFT.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      background: DataTypes.STRING,
      bottom: DataTypes.STRING,
      eyes: DataTypes.STRING,
      facialhair: DataTypes.STRING,
      footwear: DataTypes.STRING,
      head: DataTypes.STRING,
      mouth: DataTypes.STRING,
      top: DataTypes.STRING,
      type: DataTypes.STRING,
      imagename: DataTypes.STRING,
      counter: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NFT",
    }
  );
  return NFT;
};
