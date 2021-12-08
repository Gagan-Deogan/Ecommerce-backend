const { uuid } = require("uuidv4");
const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const { isAlreadyInCart, updateCart } = require("../utils/cart.utils");
const { extractProductfromProducts } = require("../utils/wishlist.utils");
const { extend } = require("lodash");
const yenv = require("yenv");
const env = yenv("app.yaml", { env: "env_variables" });
const STRIPE_SECRET_KEY = env["STRIPE_SECRET_KEY"];
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const getCartAndWishlist = async (req, res) => {
  try {
    const cart = req.cart;
    const wishlist = req.wishlist;
    const products = extractProductfromProducts(wishlist);
    if (cart)
      res.status(200).json({
        data: { cartItems: cart.products, wishlist: products },
      });
    else res.status(200).json({ data: { cartItems: [], wishlist: products } });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cart, user, product } = req;
    let updatedCart = {};
    if (cart) {
      if (isAlreadyInCart(cart, product)) {
        throw Error("Already In cart");
      }
      updatedCart = updateCart(cart, product);
      updatedCart = await updatedCart.save();
    } else {
      let newCart = new Cart({
        userId: user._id,
        products: [{ _id: product._id, product: product._id, quantity: 1 }],
      });
      await newCart.save();
    }
    res.status(200).json({ data: "Product Added" });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

const updateCartProduct = async (req, res) => {
  try {
    const { cart, product } = req;
    const { quantity } = req.body;
    if (cart) {
      const products = await cart.products.id(product._id);
      if (products) {
        const productsUpdate = extend(products, { quantity: quantity });
        cart.products = extend(cart.products, { productsUpdate });
        await cart.save();
        res.status(200).json({ data: "Product updated" });
      } else {
        throw Error("No product in Cart");
      }
    } else {
      throw Error("No Cart present");
    }
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

const removeFormCart = async (req, res) => {
  try {
    const { cart, product } = req;
    if (cart) {
      await cart.products.id(product._id).remove();
      await cart.save();
      res.status(200).json({ data: "Product Removed" });
    }
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

const checkout = async (req, res) => {
  try {
    let { user, cart } = req;
    const { token, totalEffectivePrice } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: totalEffectivePrice * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey,
      }
    );
    cart.products = [];
    await cart.save();
    res.status(201).json({ data: "Order Placed" });
  } catch (err) {
    console.log("Gagan", { err });
    res.status(503).json({ error: "something went wrong" });
  }
};
module.exports = {
  getCartAndWishlist,
  addProductToCart,
  addProductToCart,
  updateCartProduct,
  removeFormCart,
  checkout,
};
