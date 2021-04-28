const express = require("express");
const router = express.Router();
const { getProductById } = require("../controllers/params")
const { getProductDetails, updateProduct, getAllProducts,newProduct } = require("../controllers/product.controller")



router.get("/", getAllProducts)
router.post("/",newProduct)

router.param("productId",getProductById)
router.get("/:productId", getProductDetails)
router.post("/:productId",updateProduct)


module.exports = router