require("dotenv").config();
const models = require("../../models/index");

const path = require("path");
const fs = require("fs");
const canvas = require("canvas");
const generateRandom = require("../middleware/random-image");
const rollSingle = require("../middleware/roll-single");
const rollSingleSchema = require("../schemas/roll-random.scehema");
const generate = require("../middleware/generate");
const ipfsAPI = require("ipfs-api");
var ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });
// const abi = require("../../data/abi.json");
// const Web3 = require("web3");

// var web3 = new Web3(process.env.INFURA_URL);

let punk = 1;

module.exports = {
  mint: async (req, res, next) => {
    try {
      const ca = canvas.createCanvas(600, 600);
      const ctx = ca.getContext("2d");
      // const body = await loginSchema.validateAsync(req.body);
      console.log(req.body);

      const { body, bottom, footwear, top } = req.body;
      console.log("body", body);

      const bodyy = await canvas.loadImage(
        path.join(__dirname, `../../images/body/${body}`)
      );
      const bottomm = await canvas.loadImage(
        path.join(__dirname, `../../images/bottom/${bottom}`)
      );
      const footwearr = await canvas.loadImage(
        path.join(__dirname, `../../images/footwear/${footwear}`)
      );
      const topp = await canvas.loadImage(
        path.join(__dirname, `../../images/top/${top}`)
      );

      ctx.fillStyle = "#fff";
      ctx.drawImage(bodyy, 0, 0, 600, 600);
      ctx.drawImage(bottomm, 0, 0, 600, 600);
      ctx.drawImage(footwearr, 0, 0, 600, 600);
      ctx.drawImage(topp, 0, 0, 600, 600);
      console.log("draw");
      const buffer = ca.toBuffer("image/png");
      console.log("asdasdasd");
      fs.writeFileSync(
        path.join(__dirname, `../../output/${punk}.png`),
        buffer
      );

      const response = await ipfs.add(buffer);
      let hash = response[0].hash;

      const nft = await models.NFT.create({
        name: `Punk ${punk}`,
        description: "",
        image: `https://ipfs.io/ipfs/${punk}`,
        body: body,
        bottom: bottom,
        footwear: footwear,
        top: top,
      });
      punk++;

      return res.json(nft);
    } catch (error) {
      console.log("server error", error);
      next(error);
    }
  },

  roll_all: async (req, res, next) => {
    try {
      const ca = canvas.createCanvas(600, 600);
      const ctx = ca.getContext("2d");
      const { images, imageName, gender } = await generateRandom();
      // let name = await generate({ images, imageName, gender });

      console.log(imageName);
      const nft = {
        background: imageName.BACKGROUND,
        body: imageName.TYPE,
        bottom: imageName.BOTTOM,
        footwear: imageName.FOOTWEAR,
        head: imageName.HEAD,
        top: imageName.TOP,
        gender: gender,
        eyes: imageName?.EYES,
        facialHair: imageName["FACIAL HAIR"],
      };
      console.log(nft);
      punk++;

      return res.json(nft);
    } catch (error) {
      console.log("server error", error);
      next(error);
    }
  },

  roll_single: async (req, res, next) => {
    try {
      const ca = canvas.createCanvas(600, 600);
      const ctx = ca.getContext("2d");
      let bodyy = await rollSingleSchema.validateAsync(req.body);
      const { gender, type } = bodyy;
      console.log(bodyy);
      const data = await rollSingle(gender, type);

      // ctx.fillStyle = "#fff";

      // images.forEach((item) => {
      //   ctx.drawImage(item, 0, 0, 600, 600);
      // });

      // console.log("draw");
      // const buffer = ca.toBuffer("image/png");
      // // const response = await ipfs.add(buffer)
      // // let hash = response[0].hash

      // fs.writeFileSync(
      //   path.join(__dirname, `../../output/${punk}.png`),
      //   buffer
      // );

      // const nft = {
      //   image: `${punk}.png`,
      //   body: imageNames.body,
      //   bottom: imageNames.bottom,
      //   footwear: imageNames.footwear,
      //   top: imageNames.top,
      // };
      // punk++;
      return res.json(data);
    } catch (error) {
      console.log("server error", error);
      next(error);
    }
  },

  get_meta_data: async (req, res, next) => {
    try {
      const { id } = req.params;

      const nft = await models.NFT.findOne({
        where: {
          id: id,
        },
      });
      if (!nft) {
        throw new Error("Token ID invalid");
      }
      //console.log("ENV ;;;",process.env.DOMAIN_URL)

      const resObj = {
        name: nft.name,
        symbol: "DOM",
        image: nft.image,
        description: nft.description,
        seller_fee_basis_points: 0,
        animation_url: "https://www.arweave.net/efgh1234?ext=mp4",
        external_url: "https://solflare.com",
        attributes: [
          {
            trait_type: "Body",
            value: `${process.env.DOMAIN_URL}/body/${nft.body}`,
          },

          {
            trait_type: "Bottom",
            value: `${process.env.DOMAIN_URL}/bottom/${nft.bottom}`,
          },

          {
            trait_type: "Footwear",
            value: `${process.env.DOMAIN_URL}/footwear/${nft.footwear}`,
          },

          {
            trait_type: "Top",
            value: `${process.env.DOMAIN_URL}/top/${nft.top}`,
          },
        ],
        creators: [
          {
            address: "SOLFLR15asd9d21325bsadythp547912501b",
            share: 100,
          },
        ],
      };

      return res.json(resObj);
    } catch (error) {
      console.log("sefrver error", error.message);
      next(error);
    }
  },
};
