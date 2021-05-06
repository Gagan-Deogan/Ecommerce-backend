const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: {
    type: String,
    required: "name is required",
    unique: "name must be unique",
  },
  price: {
    type: Number,
    required: "price is required",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catagory",
    required: "model name is required",
  },
  discount: {
    type: Number,
    min: [0, "discount policy should not allow less than 0%"],
    max: [60, "discount policy should not allow more than 60%"],
    required: "price is required",
  },
  effectivePrice: {
    type: Number,
    required: "effectivePrice is required",
  },
  rating: {
    type: Number,
    min: [1, "Rating should not allow less than 1"],
    max: [5, "Rating should not allow less than 5"],
    required: "Rating is required",
  },
  avalibility: {
    type: Boolean,
    required: "Avalibility is required",
  },
  fastDelivery: {
    type: Boolean,
    required: "Avalibility is required",
  },
  label: {
    type: String,
  },
  description: {
    type: String,
    required: "Description is required",
  },
  image: {
    type: String,
    required: "Image is required",
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
