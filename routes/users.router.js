const express = require("express")
const router = express.Router();
const {User} = require("../models/user.model.js")
const { userLogin , newUser } = require("../controllers/user.controller")

router.post("/",newUser)

router.post("/login", userLogin)

module.exports = router;