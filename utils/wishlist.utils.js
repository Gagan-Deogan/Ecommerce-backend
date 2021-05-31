const { concat } = require("lodash");

const isAlreadyInWishlist = (wishlist, product) => {
  return wishlist.products.id(product._id);
};

const updateWishlist = (wishlist, product) => {
  const updatedProducts = concat(wishlist.products, {
    _id: product._id,
    product: product._id,
  });
  return updatedProducts;
};

const extractProductfromProducts = (wishlist) => {
  const products = wishlist.products.map((product) => product.product);
  return products;
};

module.exports = {
  isAlreadyInWishlist,
  updateWishlist,
  extractProductfromProducts,
};
