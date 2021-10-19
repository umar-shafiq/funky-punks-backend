const Joi = require("joi");

const rollRandwom = Joi.object({
  gender: Joi.string().required(),
  type: Joi.string().required(),
});

module.exports = rollRandwom;
