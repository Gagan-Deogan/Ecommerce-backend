const express = require("express");
const router = express.Router();
const { authenticate } = require("../config/passport");
const {
  getUserAddresses,
  addAddress,
} = require("../controllers/address.controller");

router.use(authenticate);
router.get("/", getUserAddresses);
router.post("/", addAddress);

module.exports = router;
