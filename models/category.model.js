const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Product } = require("../models/product.model");

const CategorySchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  name: {
    type: String,
    unique: "name should be unique",
    required: "Catagory name is required",
  },
});
const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };
