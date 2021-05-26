const { Cart } = require("../models/cart.model")
const { Product } = require("../models/product.model")
const {isAlreadyInCart, updateCart} = require("../utils/cart.utils")
const {extend} = require('lodash');

const populateOptions = {
  path:'products.details',
  select:"_id name price discount effectivePrice image"
}

exports.getCartlist =  async (req,res) =>{
  try{
    const cart = req.cart
    if(cart)
      res.status(200).json({ success:true, data:cart.products })
    else
      res.status(200).json({ success:true, data:[] })
  }catch(err){
    res.status(503).json({success: false, error: err.message})
  }
}

exports.addProductToCart = async (req, res) =>{
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
      let NewCart = new Cart({ userId:user._id, products:[{_id:product._id, details:product._id, quantity:1}] } );
      updatedCart = await NewCart.save();
    }
    res.status(200).json({ success:true, data:"Product Added Successfully" })
  }catch(err){
    res.status(503).json({success:false, error:err.message})
  }
}

exports.updateCartProduct = async (req, res) =>{
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

exports.removeFormCart = async (req, res) =>{
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