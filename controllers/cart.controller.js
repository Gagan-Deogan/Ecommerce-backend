const { Cart } = require("../models/cart.model")
const { Product } = require("../models/product.model")
const {extend} = require('lodash');

exports.getCartlist =  async (req,res) =>{
  try{
    const cart = req.cart
    if(cart)
      res.status(200).json({success:true, data:cart.products})
    else
      res.status(200).json({success:true, data:[]})
  }catch(err){
    res.status(500).json({success: false, error: err.message})
  }
}

exports.addProductToCart = async (req, res) =>{
  try{
    const {cart,user, product } = req
    if(cart){
      if(cart.products.id(product._id)){
        throw Error("Already In cart");
      }
      let updatedCart = { ...cart, products: cart.products.concat({_id:product._id, details:product._id, quantity:1})}
      updatedCart = extend( cart, updatedCart )
      const result = await updatedCart.save();
    }else{
      let NewCart = new Cart( { _id:user._id, products:[{_id:product._id, details:product._id, quantity:1} ] } );
      const result = await NewCart.save();
    }
    res.status(200).json({success:true, msg:"Product Added"})
  }catch(err){
    res.status(500).json({success:false, error:err.message})
  }
}

exports.updateCartProduct = async (req, res) =>{
  try{
    const {cart, product} = req
    const { quantity, productId } = req.body
    if(cart){
      const products = await cart.products.id(product._id)
      if(products){
        const productsUpdate = extend(products,{quantity:quantity} )
        cart.products = extend(cart.products,{productsUpdate})
        await cart.save()
        res.status(200).json({success:true, msg:"Product Added"})
      }else{
        throw Error("No product in Cart");
      }
    }else{
        throw Error("No Cart present");
    }
  }catch(err){
    res.status(500).json({success:false, error:err.message})
  }
}

exports.removeFormCart = async (req, res) =>{
  try{
    const { cart, product } = req
    if(cart){
      await cart.products.id(product._id).remove()
      await cart.save()
      res.status(200).json({success:true, msg:"Product Removed"})
    }
  }catch(err){
    res.status(500).json({success:false, error:err.message})
  }
}