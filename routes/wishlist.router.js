const express = require("express");
const router = express.Router();
const { authenticate } = require("../config/passport");
const { getUserWishlist, getProductById } = require("../controllers/params");
const { addProductToWishlist } = require("../controllers/wishlist.controller");
router.use(authenticate);
router.use(getUserWishlist);

router.param("productId", getProductById);
router.post("/:productId", addProductToWishlist);

module.exports = router;
