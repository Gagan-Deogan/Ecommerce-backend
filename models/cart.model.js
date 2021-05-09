const mongoose = require("mongoose");
const Schema = mongoose.Schema

const cartItems = new Schema({ 
    details: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        unique :"product already in cart",
        required:"product required"
    },
    quantity: {
        type: Number,
        required:"quantity required", 
        min:1
    }
});


const CartShema = new Schema({
  products:[cartItems],
  _id:{
    type:Schema.ObjectId,
    ref:"User",
    unique:"user already exists",
    required:"userId required", 
  }
},
{ timestamps: true }
);

const Cart = mongoose.model("Cart", CartShema);
module.exports = { Cart }