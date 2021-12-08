const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItems = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: "product required",
  },
  quantity: {
    type: Number,
    required: "quantity required",
    min: 1,
  },
});

const CartShema = new Schema(
  {
    products: [cartItems],
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      unique: "user already exists",
      required: "userId required",
      index: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartShema);
module.exports = { Cart };
