const express = require("express");
const router = express.Router();
const { getUserById, getUserCart, getProductById } = require("../controllers/params")
const { getCartlist , addProductToCart, removeFormCart, updateCartProduct } = require("../controllers/cart.controller")
const { authenticate } = require("../config/passport")

router.use(authenticate)
router.use(getUserCart)

router.get("/", getCartlist)

router.param("productId", getProductById )
router.post("/:productId", addProductToCart )

router.put("/:productId",getProductById, updateCartProduct )
router.delete("/:productId",getProductById, removeFormCart )



module.exports = router;