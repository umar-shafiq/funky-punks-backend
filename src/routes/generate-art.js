const router = require("express").Router();
const cors = require("cors")
const {
  mint,
  roll_all,
  roll_single,
  get_meta_data,
  add_addresses,
  checklimit,
  update_mint_status,
} = require("../controller/generate");

var corsOptions = {
  origin: function (origin, callback) {
    // db.loadOrigins is an example call to load
    // a list of origins from a backing database
    db.loadOrigins(function (error, origins) {
      callback(error, origins)
    })
  }
}

router.post("/mint",  mint);

router.get("/rollall", roll_all);

router.post("/rollone",  roll_single);

router.get("/metadata/:id", get_meta_data);

router.get("/addwhitelist", add_addresses);

router.get("/check_whitelist/:address", checklimit);

router.post("/update_whitelist", update_mint_status);

module.exports = router;
