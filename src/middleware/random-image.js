const { loadImage } = require("canvas");
var fs = require("fs");
const path = require("path");
const canvas = require("canvas");
const {
  MALE_HEAD,
  MALE_EYES,
  MALE_FACIALHAIR,
  MALE_FOOTWEAR,
  MALE_TYPE,
  MALE_BOTTOM,
  MALE_TOP,
  MALE_MOUTH,
} = require("../../data/male rarity");
const {
  FEMALE_HEAD,
  FEMALE_EYES,
  FEMALE_FOOTWEAR,
  FEMALE_TYPE,
  FEMALE_BOTTOM,
  FEMALE_TOP,
  FEMALE_MOUTH,
} = require("../../data/female rarity");
const { Console } = require("console");

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

    if (gender == "MALE") {
      parts.forEach(async (item) => {
        console.log("iteration ::", item);
        var files = fs.readdirSync(
          path.join(__dirname, `../../images/${gender}/${item}`)
        );
        // let random = files[Math.floor(Math.random() * files.length)];
        // console.log(random);
        let random;
        if (item == "TYPE") {
          random = weightFunction(MALE_TYPE);
        } else if (item == "MOUTH") {
          random = weightFunction(MALE_MOUTH);
        } else if (item == "EYES") {
          random = weightFunction(MALE_EYES);
        } else if (item == "FACIAL HAIR") {
          random = weightFunction(MALE_FACIALHAIR);
        } else if (item == "BOTTOM") {
          random = weightFunction(MALE_BOTTOM);
        } else if (item == "TOP") {
          random = weightFunction(MALE_TOP);
        } else if (item == "FOOTWEAR") {
          random = weightFunction(MALE_FOOTWEAR);
        } else if (item == "HEAD") {
          random = weightFunction(MALE_HEAD);
        } else if (item == "BACKGROUND") {
          random = {
            Attribute:
              files[Math.floor(Math.random() * files.length)].split(".")[0],
          };
        }
        console.log(random, ";;;;;;random");
        imageName[`${item}`] = random.Attribute + ".png";
        const randomImage = await canvas.loadImage(
          path.join(
            __dirname,
            `../../images/${gender}/${item}/${random.Attribute}.png`
          )
        );
        images.push(randomImage);
      });
    } else if (gender == "FEMALE") {
      parts.forEach(async (item) => {
        console.log("iteration ::", item);
        var files = fs.readdirSync(
          path.join(__dirname, `../../images/${gender}/${item}`)
        );
        // let random = files[Math.floor(Math.random() * files.length)];
        // console.log(random);
        let random;
        if (item == "TYPE") {
          random = weightFunction(FEMALE_TYPE);
        } else if (item == "MOUTH") {
          random = weightFunction(FEMALE_MOUTH);
        } else if (item == "EYES") {
          random = weightFunction(FEMALE_EYES);
        } else if (item == "BOTTOM") {
          random = weightFunction(FEMALE_BOTTOM);
        } else if (item == "TOP") {
          random = weightFunction(FEMALE_TOP);
        } else if (item == "HEAD") {
          random = weightFunction(FEMALE_HEAD);
        } else if (item == "FOOTWEAR") {
          random = weightFunction(FEMALE_FOOTWEAR);
        } else if (item == "BACKGROUND") {
          random = {
            Attribute:
              files[Math.floor(Math.random() * files.length)].split(".")[0],
          };
        }
        console.log(random, ";;;;;;random");
        imageName[`${item}`] = random.Attribute + ".png";
        const randomImage = await canvas.loadImage(
          path.join(
            __dirname,
            `../../images/${gender}/${item}/${random.Attribute}.png`
          )
        );
        images.push(randomImage);
      });
    }

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
  var random = Math.random() * 100;
  if (random === 0) {
    random += 1;
  }

  for (var i = 0; i < items.length; i++) {
    cumul -= parseFloat(items[i].Rarity);
    if (random >= cumul) {
      return items[i];
    }
  }
}
module.exports = randomImage;
