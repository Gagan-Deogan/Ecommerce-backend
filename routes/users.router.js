const express = require("express")
const router = express.Router();
const {User} = require("../models/user.model.js")
const { userLogin , newUser, passwordsEncriptor } = require("../controllers/user.controller")
router.post("/signup", passwordsEncriptor, newUser)

router.post("/login", userLogin)

module.exports = router;