const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistItems = new Schema({ 
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required:"product required"
    },
});


const wishlistSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref: "Product",
    required:"Required User Id."
  },
  products:[wishlistItems]
}, { timestamps: true }) 

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = {Wishlist} 