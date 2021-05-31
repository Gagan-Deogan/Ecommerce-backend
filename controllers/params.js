const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");
const { Wishlist } = require("../models/wishlist.model");

const productsPopulateOptions = {
  path: "products.product",
  select: "_id name price discount effectivePrice image avalibility",
};

const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw Error("No such user found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(503).json({ success: false, error: err.message });
  }
};

const getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw Error("No such Product found");
    }
    req.product = product;
    next();
  } catch (err) {
    res.status(503).json({ success: false, error: err.message });
  }
};

const getCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw Error("No such category Found");
    }
    req.category = category;
    next();
  } catch (err) {
    res.status(503).json({ success: false, error: err.message });
  }
};

const getUserCart = async (req, res, next) => {
  try {
    const { user } = req;
    const cart = await Cart.findOne({ userId: user._id }).populate(
      productsPopulateOptions
    );
    req.cart = cart;
    next();
  } catch (err) {
    res.status(503).json({ success: false, error: err.message });
  }
};

const getUserWishlist = async (req, res, next) => {
  try {
    const { user } = req;
    const wishlist = await Wishlist.findOne({ userId: user._id }).populate(
      productsPopulateOptions
    );
    req.wishlist = wishlist;
    next();
  } catch (err) {
    res.status(503).json({ success: false, error: err.message });
  }
};

module.exports = {
  getUserById,
  getProductById,
  getCategoryById,
  getUserCart,
  getUserWishlist,
};
