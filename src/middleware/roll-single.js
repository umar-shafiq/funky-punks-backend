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
const randomImage = async (gender, item) => {
  if (gender == "MALE") {
    console.log(gender, item);
    var files = fs.readdirSync(
      path.join(__dirname, `../../images/${gender}/${item}`)
    );
    let random;
    if (item == "HEAD") {
      random = weightFunction(MALE_HEAD);
    } else if (item == "TOP") {
      random = weightFunction(MALE_TOP);
    } else if (item == "BOTTOM") {
      random = weightFunction(MALE_BOTTOM);
    } else if (item == "FOOTWEAR") {
      random = weightFunction(MALE_FOOTWEAR);
    }
    return { item: `${random.Attribute}.png` };
  } else if (gender == "FEMALE") {
    console.log(gender, item);
    var files = fs.readdirSync(
      path.join(__dirname, `../../images/${gender}/${item}`)
    );
    let random;
    if (item == "HEAD") {
      random = weightFunction(FEMALE_HEAD);
    } else if (item == "TOP") {
      random = weightFunction(FEMALE_TOP);
    } else if (item == "BOTTOM") {
      random = weightFunction(FEMALE_BOTTOM);
    } else if (item == "FOOTWEAR") {
      random = weightFunction(FEMALE_FOOTWEAR);
    }
    return { item: `${random.Attribute}.png` };
  }
};

function weightFunction(items) {
  var cumul = 100;
  var random = Math.floor(Math.random() * 100);

  for (var i = 0; i < items.length; i++) {
    cumul -= parseFloat(items[i].Rarity);
    if (random >= cumul) {
      return items[i];
    }
  }
}

module.exports = randomImage;
