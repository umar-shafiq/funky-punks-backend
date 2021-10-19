require("dotenv").config();
const models = require("../../models/index");

const path = require("path");
const fs = require("fs");
const canvas = require("canvas");
const generateRandom = require("../middleware/random-image");
const rollSingle = require("../middleware/roll-single");
const rollSingleSchema = require("../schemas/roll-random.scehema");
const generate = require("../middleware/generate");
const whitelist = require("../../data/whitelist");
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

      const attrubutes = req.body.rollData;
      console.log("attrubutes", attrubutes);
      let facialHair;
      let mouth;
      let eyes;
      ctx.fillStyle = "#fff";
      const background = await canvas.loadImage(
        path.join(
          __dirname,
          `../../images/${attrubutes.gender}/BACKGROUND/${attrubutes.background}`
        )
      );
      ctx.drawImage(background, 0, 0, 600, 600);

      const body = await canvas.loadImage(
        path.join(
          __dirname,
          `../../images/${attrubutes.gender}/TYPE/${attrubutes.body}`
        )
      );
      ctx.drawImage(body, 0, 0, 600, 600);

      const bottom = await canvas.loadImage(
        path.join(
          __dirname,
          `../../images/${attrubutes.gender}/BOTTOM/${attrubutes.bottom}`
        )
      );
      ctx.drawImage(bottom, 0, 0, 600, 600);

      const top = await canvas.loadImage(
        path.join(
          __dirname,
          `../../images/${attrubutes.gender}/TOP/${attrubutes.top}`
        )
      );
      ctx.drawImage(top, 0, 0, 600, 600);

      const footwear = await canvas.loadImage(
        path.join(
          __dirname,
          `../../images/${attrubutes.gender}/FOOTWEAR/${attrubutes.footwear}`
        )
      );
      ctx.drawImage(footwear, 0, 0, 600, 600);
      if (attrubutes.mouth) {
        mouth = await canvas.loadImage(
          path.join(
            __dirname,
            `../../images/${attrubutes.gender}/MOUTH/${attrubutes.mouth}`
          )
        );
        ctx.drawImage(mouth, 0, 0, 600, 600);
      }

      if (attrubutes.eyes) {
        eyes = await canvas.loadImage(
          path.join(
            __dirname,
            `../../images/${attrubutes.gender}/EYES/${attrubutes.eyes}`
          )
        );
        ctx.drawImage(eyes, 0, 0, 600, 600);
      }
      if (attrubutes.facialHair) {
        facialHair = await canvas.loadImage(
          path.join(
            __dirname,
            `../../images/${attrubutes.gender}/FACIAL HAIR/${attrubutes.facialHair}`
          )
        );
        ctx.drawImage(facialHair, 0, 0, 600, 600);
      }
      const head = await canvas.loadImage(
        path.join(
          __dirname,
          `../../images/${attrubutes.gender}/HEAD/${attrubutes.head}`
        )
      );
      ctx.drawImage(head, 0, 0, 600, 600);

      console.log("draw");
      const buffer = ca.toBuffer("image/png");
      console.log("asdasdasd");
      const date = new Date();

      const name = date.getTime();

      fs.writeFileSync(
        path.join(__dirname, `../../output/${name}.png`),
        buffer
      );

      let count = await models.NFT.count();

      const nft = await models.NFT.create({
        name: `Punk ${count + 1}`,
        imagename: name.toString(),
        description: "",
        image: "",
        background: attrubutes.background.split(".")[0],
        bottom: attrubutes.bottom.split(".")[0],
        eyes: attrubutes.eyes ? attrubutes.eyes.split(".")[0] : "",
        facialhair: attrubutes.facialhair
          ? attrubutes.facialhair.split(".")[0]
          : "",
        footwear: attrubutes.footwear.split(".")[0],
        head: attrubutes.head.split(".")[0],
        mouth: attrubutes.mouth ? attrubutes.mouth.split(".")[0] : "",
        top: attrubutes.top.split(".")[0],
        type: attrubutes.body.split(".")[0],
        counter: req.body.counter,
      });

      const response = await ipfs.add(buffer);
      let hash = response[0].hash;
      console.log(hash);

      await nft.update({ image: `https://ipfs.io/ipfs/${hash}` });
      //ipfs.io/ipfs/QmSDcE6CrKmQuCSCQ6YTYKx13AXg7c4mgP4n27x3vi5keq

      https: return res.json(nft);
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
          counter: id,
        },
      });
      console.log(nft);
      if (!nft) {
        throw new Error("Token ID invalid");
      }
      //console.log("ENV ;;;",process.env.DOMAIN_URL)

      const resObj = {
        name: nft.name,
        symbol: "FUNK",
        image: nft.image,
        description: nft.description,
        seller_fee_basis_points: 1000,
        external_url: "https://funkypunks.net",
        attributes: [
          {
            trait_type: "Background",
            value: nft.background,
          },

          {
            trait_type: "Bottom",
            value: nft.bottom,
          },

          {
            trait_type: "Eyes",
            value: nft.eyes,
          },

          {
            trait_type: "Facial Hair",
            value: nft.facialhair,
          },
          {
            trait_type: "Footwear",
            value: nft.footwear,
          },
          {
            trait_type: "Head",
            value: nft.head,
          },
          {
            trait_type: "Mouth",
            value: nft.mouth,
          },
          {
            trait_type: "Top",
            value: nft.top,
          },
          {
            trait_type: "Type",
            value: nft.type,
          },
        ],
        collection: {
          name: "",
          family: "",
        },
        properties: {
          creators: [
            {
              address: "9crduWW6LdFZgSpwVS2JRsycWUUbf1BsPvoDMvnQ4yqD",
              share: 100,
            },
          ],
        },
      };

      return res.json(resObj);
    } catch (error) {
      console.log("sefrver error", error.message);
      next(error);
    }
  },
  add_addresses: async (req, res, next) => {
    try {
      let result = await whitelist.forEach(async (data) => {
        await models.whitelist.create({
          address: data.address,
          limit: parseInt(data.limit),
          minted: 0,
        });
      });
      return res.json(result);
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
  checklimit: async (req, res, next) => {
    try {
      const address = req.params.address;
      console.log("addressmmmm", address);
      const nft = await models.whitelist.findOne({
        where: {
          address: address,
        },
      });
      if (!nft) {
        throw new Error("token address not exist ");
      }
      if (nft.minted < nft.limit) {
        return res.status(200).send({
          data: "Availble for Mint",
          error: null,
          success: true,
        });
      } else {
        return res.status(500).send({
          data: "Not Availble for mint",
          error: null,
          success: true,
        });
      }
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
  update_mint_status: async (req, res, next) => {
    try {
      const useraddress = req.body.useraddress;
      const tokenaddress = req.body.tokenaddress;
      const countervalue = req.body.countervalue;
      console.log("addressmmmm", useraddress);
      const nft = await models.whitelist.findOne({
        where: {
          address: useraddress,
        },
      });
      if (!nft) {
        throw new Error("token address not exist ");
      }

      await models.whitelist.increment(
        { minted: 1 },
        { where: { address: useraddress } }
      );
      await models.mintedtokens.create({
        useraddress: useraddress,
        tokenaddress: tokenaddress,
        countervalue: countervalue,
      });
      return res.status(200).send({
        data: "Token Minted",
        error: null,
        success: true,
      });
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
};
