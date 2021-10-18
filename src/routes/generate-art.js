const router = require("express").Router();

const {
  mint,
  roll_all,
  roll_single,
  get_meta_data,
} = require("../controller/generate");

router.post("/mint", mint);

router.get("/rollall", roll_all);

router.post("/rollone", roll_single);

router.get("/metadata/:id", get_meta_data);

module.exports = router;
