const express = require("express")
const router = express.Router();
const {User} = require("../models/user.model.js")
const { authenticate } = require("../config/passport")
const { userLogin , newUser, userDetails } = require("../controllers/user.controller")
router.post("/signup", newUser)

router.post("/login", userLogin)

router.use(authenticate)
router.get("/self", userDetails)

module.exports = router;