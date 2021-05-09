const express = require("express");
const router = express.Router()
const { getProductByCategory } = require("../controllers/category.controller.js")
const { getCategoryById } = require("../controllers/params")

router.param("categoryId", getCategoryById)
router.get("/:categoryId",getProductByCategory)

module.exports = router;