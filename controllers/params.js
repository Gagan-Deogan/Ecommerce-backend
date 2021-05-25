const { User } = require("../models/user.model")
const { Cart } = require("../models/cart.model")
const { Product } = require("../models/product.model")
const { Category } = require("../models/category.model")
const excludefields = {
  "products._id":0,
  "__v":0
}
const populateOptions = {
  path:'products.details',
  select:"_id name price discount effectivePrice image"
}
exports.getUserById = async(req, res, next,id) =>{
  try{
    const user = await User.findById(id)
    if(!user){
      throw Error("No such user found");
    }
    req.user = user;
    next()
  }catch(err){
    res.status(500).json({ success:false, error:err.message })
  }
}

exports.getProductById = async(req, res, next,id) =>{
  try{
    const product = await Product.findById(id)
    if(!product){
      throw Error("No such Product found");
    }
    req.product = product;
    next()
  }catch(err){
    res.status(500).json({ success:false, error:err.message })
  }
}

exports.getUserCart = async(req, res, next)=>{
  try{
    const {user} = req
    const cart = await Cart.findById(user._id).populate(populateOptions)
    req.cart = cart;
    next();
  }catch(err){
    res.status(500).json({ success:false, error:err.message })
  }
}
exports.getCategoryById = async(req, res, next, id)=>{
  try{
    const category = await Category.findById(id)
    if(!category){
      throw Error("No such category Found");
    }
    console.log(category)
    req.category = category
    next() 
  }catch (err){
    res.status(500).json({ success:false, error:err.message })
  }
}