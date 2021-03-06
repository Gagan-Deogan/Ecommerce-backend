const Wishlist = require("../models/wishlist.model");
const {
  isAlreadyInWishlist,
  updateWishlist,
} = require("../utils/wishlist.utils");

const addProductToWishlist = async (req, res) => {
  try {
    let { wishlist, product } = req;
    let message = "";
    if (isAlreadyInWishlist(wishlist, product)) {
      wishlist.products.id(product._id).remove();
      message = "Product Remove from Wishlist";
    } else {
      wishlist.products = updateWishlist(wishlist, product);
      message = "Product Added to Wishlist";
    }
    await wishlist.save();
    res.status(200).json({ data: message });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

module.exports = { addProductToWishlist };
