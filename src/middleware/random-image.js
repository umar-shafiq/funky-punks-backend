const { loadImage } = require("canvas");
var fs = require("fs");
const path = require("path");
const canvas = require("canvas");

const randomImage = async () => {
  try {
    const parts = ["BACKGROUND", "TYPE", "BOTTOM", "FOOTWEAR", "TOP", "HEAD"];
    gender = Math.random() * 100 < 50 ? "MALE" : "FEMALE";
    eyes = Math.random() * 100 < 25 ? parts.push("EYES") : false;
    if (gender == "MALE") {
      facialHair =
        Math.random() * 100 < 13.5 ? parts.push("FACIAL HAIR") : false;
    }
    mouth = Math.random() * 100 < 24 ? parts.push("MOUTH") : false;

    let images = [];
    let imageName = {};

    parts.forEach(async (item) => {
      console.log("iteration ::", item);
      var files = fs.readdirSync(
        path.join(__dirname, `../../images/${gender}/${item}`)
      );
      let random = files[Math.floor(Math.random() * files.length)];
      imageName[`${item}`] = random;
      const randomImage = await canvas.loadImage(
        path.join(__dirname, `../../images/${gender}/${item}/${random}`)
      );
      images.push(randomImage);
    });

    // /* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
    // let chosenBody = files[Math.floor(Math.random() * files.length)]

    // console.log("choosen body ::: ",chosenBody)

    // const body = await canvas.loadImage(path.join(__dirname,`../../images/body/${chosenBody}`));
    // console.log("body ffrom Helper :",body)
    return { images, imageName, gender };
  } catch (error) {
    console.log("server error", error);
    next(error);
  }
};

function weightFunction(items) {
  var cumul = 100;
  var random = Math.floor(Math.random() * 100);

  for (var i = 0; i < items.length; i++) {
    cumul -= parseInt(items[i].Rarity);
    if (random >= cumul) {
      return items[i];
    }
  }
}
module.exports = randomImage;
