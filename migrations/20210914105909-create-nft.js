"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("NFTs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      background: {
        type: Sequelize.STRING,
      },
      bottom: {
        type: Sequelize.STRING,
      },
      eyes: {
        type: Sequelize.STRING,
      },
      facialhair: {
        type: Sequelize.STRING,
      },
      footwear: {
        type: Sequelize.STRING,
      },
      head: {
        type: Sequelize.STRING,
      },
      mouth: {
        type: Sequelize.STRING,
      },
      top: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      imagename: {
        type: Sequelize.STRING,
      },
      counter: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("NFTs");
  },
};
