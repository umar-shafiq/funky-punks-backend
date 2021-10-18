const { loadImage } = require("canvas");
var fs = require("fs");
const path = require("path");
const canvas = require("canvas");

const randomImage = async (body, bottom, footwear, top, type) => {
  try {
    let bodyy;
    let bottomm;
    let footwearr;
    let topp;
    let images = [];

    let imageNames = {};

    console.log("im middlewareeeee :::");
    console.log("im middlewareeee typppeee :::", type);

    if (type === "body") {
      var files = fs.readdirSync(path.join(__dirname, `../../images/${type}`));
      let random = files[Math.floor(Math.random() * files.length)];
      bodyy = await canvas.loadImage(
        path.join(__dirname, `../../images/body/${random}`)
      );
      bottomm = await canvas.loadImage(
        path.join(__dirname, `../../images/bottom/${bottom}`)
      );
      footwearr = await canvas.loadImage(
        path.join(__dirname, `../../images/footwear/${footwear}`)
      );
      topp = await canvas.loadImage(
        path.join(__dirname, `../../images/top/${top}`)
      );

      imageNames.body = random;
      imageNames.bottom = bottom;
      imageNames.footwear = footwear;
      imageNames.top = top;

      images.push(bodyy, bottomm, footwearr, topp);
    } else if (type === "bottom") {
      var files = fs.readdirSync(path.join(__dirname, `../../images/${type}`));
      let random = files[Math.floor(Math.random() * files.length)];
      bodyy = await canvas.loadImage(
        path.join(__dirname, `../../images/body/${body}`)
      );
      bottomm = await canvas.loadImage(
        path.join(__dirname, `../../images/bottom/${random}`)
      );
      footwearr = await canvas.loadImage(
        path.join(__dirname, `../../images/footwear/${footwear}`)
      );
      topp = await canvas.loadImage(
        path.join(__dirname, `../../images/top/${top}`)
      );

      imageNames.body = body;
      imageNames.bottom = random;
      imageNames.footwear = footwear;
      imageNames.top = top;

      images.push(bodyy, bottomm, footwearr, topp);
    } else if (type === "footwear") {
      var files = fs.readdirSync(path.join(__dirname, `../../images/${type}`));
      let random = files[Math.floor(Math.random() * files.length)];
      bodyy = await canvas.loadImage(
        path.join(__dirname, `../../images/body/${body}`)
      );
      bottomm = await canvas.loadImage(
        path.join(__dirname, `../../images/bottom/${bottom}`)
      );
      footwearr = await canvas.loadImage(
        path.join(__dirname, `../../images/footwear/${random}`)
      );
      topp = await canvas.loadImage(
        path.join(__dirname, `../../images/top/${top}`)
      );

      imageNames.body = body;
      imageNames.bottom = bottom;
      imageNames.footwear = random;
      imageNames.top = top;

      images.push(bodyy, bottomm, footwearr, topp);
    } else if (type === "top") {
      var files = fs.readdirSync(path.join(__dirname, `../../images/${type}`));
      let random = files[Math.floor(Math.random() * files.length)];
      bodyy = await canvas.loadImage(
        path.join(__dirname, `../../images/body/${body}`)
      );
      bottomm = await canvas.loadImage(
        path.join(__dirname, `../../images/bottom/${bottom}`)
      );
      footwearr = await canvas.loadImage(
        path.join(__dirname, `../../images/footwear/${footwear}`)
      );
      topp = await canvas.loadImage(
        path.join(__dirname, `../../images/top/${random}`)
      );

      imageNames.body = body;
      imageNames.bottom = bottom;
      imageNames.footwear = footwear;
      imageNames.top = random;

      images.push(bodyy, bottomm, footwearr, topp);
    }

    return { images, imageNames };
  } catch (error) {
    console.log("server error", error);
    next(error);
  }
};

module.exports = randomImage;
