const { Cart } = require("../models/cart.model")
const { Product } = require("../models/product.model")
const {isAlreadyInCart, updateCart} = require("../utils/cart.utils")
const {extractProductfromProducts} = require("../utils/wishlist.utils")
const {extend} = require('lodash');

const getCartAndWishlist =  async (req,res) =>{
  try{
    const cart = req.cart;
    const wishlist = req.wishlist;
    const products = extractProductfromProducts(wishlist)
    if(cart)
      res.status(200).json({ success:true, data:{cartItems:cart.products, wishlist:products} })
    else
      res.status(200).json({ success:true, data:{cartItems:[] , wishlist:products} })
  }catch(err){
    res.status(503).json({success: false, error: err.message})
  }
}

const addProductToCart = async (req, res) =>{
  try{
    const { cart, user, product } = req
    let updatedCart = {}
    if(cart){
      if(isAlreadyInCart(cart, product)){
        throw Error("Already In cart");
      }
      updatedCart = updateCart(cart, product)
      updatedCart = await updatedCart.save();

    }else{
      let NewCart = new Cart({ userId:user._id, products:[{_id:product._id, product:product._id, quantity:1}] } );
      updatedCart = await NewCart.save();
    }
    res.status(200).json({ success:true, data:"Product Added Successfully" })
  }catch(err){
    res.status(503).json({success:false, error:err.message})
  }
}

const updateCartProduct = async (req, res) =>{
  try{
    const {cart, product} = req
    const { quantity, productId } = req.body
    if(cart){
      const products = await cart.products.id(product._id)
      if(products){
        const productsUpdate = extend( products, { quantity: quantity } )
        cart.products = extend(cart.products,{productsUpdate})
        await cart.save()
        res.status(200).json({success:true, data:"Product updated"})
      }else{
        throw Error("No product in Cart");
      }
    }else{
        throw Error("No Cart present");
    }
  }catch(err){
    res.status(503).json({success:false, error:err.message})
  }
}

const removeFormCart = async (req, res) =>{
  try{
    const { cart, product } = req
    if(cart){
      await cart.products.id(product._id).remove()
      await cart.save()
      res.status(200).json({success:true, data:"Product Removed"})
    }
  }catch(err){
    res.status(503).json({success:false, error:err.message})
  }
}

module.exports = {addProductToCart, addProductToCart, updateCartProduct, removeFormCart}