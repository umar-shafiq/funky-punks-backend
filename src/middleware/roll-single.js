const { loadImage } = require("canvas");
var fs = require("fs");
const path = require("path");
const canvas = require("canvas");

const randomImage = async (gender, item) => {
  console.log(gender, item);
  var files = fs.readdirSync(
    path.join(__dirname, `../../images/${gender}/${item}`)
  );
  let random = files[Math.floor(Math.random() * files.length)];
  return { item: random };
};

module.exports = randomImage;
