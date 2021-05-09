const express = require("express");
const router = express.Router();
const { getUserById, getUserCart, getProductById } = require("../controllers/params")
const { getCartlist, addProductToCart, removeFormCart, updateCartProduct } = require("../controllers/cart.controller")

router.param("userId", getUserById)
router.param("userId", getUserCart)
router.get("/:userId", getCartlist)
router.param("productId", getProductById)
router.post("/:userId/:productId", addProductToCart )
router.put("/:userId/:productId",getProductById, updateCartProduct )
router.delete("/:userId/:productId",getProductById, removeFormCart )



module.exports = router;