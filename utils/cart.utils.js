const { extend } = require("lodash");

const isAlreadyInCart = (cart, product) => {
  return cart.products.id(product._id);
};

const updateCart = (cart, product) => {
  const updatedCart = {
    ...cart,
    products: cart.products.concat({
      _id: product._id,
      product: product._id,
      quantity: 1,
    }),
  };
  return extend(cart, updatedCart);
};

module.exports = { isAlreadyInCart, updateCart };
