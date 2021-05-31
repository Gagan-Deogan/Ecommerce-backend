const express = require("express");
const router = express.Router();
const { getUserById, getUserCart, getProductById, getUserWishlist } = require("../controllers/params")
const { getCartAndWishlist , addProductToCart, removeFormCart, updateCartProduct } = require("../controllers/cart.controller")
const { authenticate } = require("../config/passport")

router.use(authenticate)
router.use(getUserCart)

router.get("/",getUserWishlist, getCartAndWishlist)

router.param("productId", getProductById )
router.post("/:productId", addProductToCart )

router.put("/:productId",getProductById, updateCartProduct )
router.delete("/:productId",getProductById, removeFormCart )



module.exports = router;