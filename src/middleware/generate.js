const { loadImage } = require("canvas");
var fs = require("fs");
const path = require("path");
const canvas = require("canvas");
const models = require("../../models/index");
const { Op } = require("sequelize");

const generate = async (data) => {
  try {
    const ca = canvas.createCanvas(600, 600);
    const ctx = ca.getContext("2d");

    const { images, imageName, gender } = data;

    ctx.fillStyle = "#fff";
    console.log("body ::", imageName.body);
    images.forEach((item) => {
      console.log("bodyImagee from controller ::: ", item);
      ctx.drawImage(item, 0, 0, 600, 600);
    });

    const buffer = ca.toBuffer("image/png");

    const date = new Date();

    const name = date.getTime();

    await fs.writeFileSync(
      path.join(__dirname, `../../output/${name}.png`),
      buffer
    );

    return name;
  } catch (error) {
    console.log("server error", error);
    next(error);
  }
};

module.exports = generate;
