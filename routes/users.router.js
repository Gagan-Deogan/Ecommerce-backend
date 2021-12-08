const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model.js");
const { authenticate } = require("../config/passport");
const {
  userLogin,
  newUser,
  userDetails,
  changeUsername,
  chnagePassword,
} = require("../controllers/user.controller");
router.post("/signup", newUser);

router.post("/login", userLogin);

router.use(authenticate);
router.get("/self", userDetails);
router.put("/change_name", changeUsername);
router.put("/change_password", chnagePassword);
module.exports = router;
