const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");
const { extend } = require("lodash");

const excludeFields = {
  description: 0,
  __v: 0,
  categoryId: 0,
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, excludeFields);
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

const newProduct = async (req, res) => {
  try {
    const product = req.body;

    const categoryId = product.categoryId;
    const category = await Category.findById(categoryId);

    if (!category) {
      throw Error("There is no such Category");
    }

    const NewProduct = new Product(product);
    const savedProduct = await NewProduct.save();

    category.products.push(savedProduct._id);
    const updatedCategory = await category.save();

    res.status(200).json({ data: savedProduct });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};

const getProductDetails = (req, res) => {
  const product = req.product;
  res.status(200).json({ data: product });
};

const updateProduct = async (req, res) => {
  try {
    const productUpdates = req.body;
    let { product } = req;
    product = extend(product, productUpdates);
    product = await product.save();

    res.status(200).json({ data: product });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};
module.exports = {
  getAllProducts,
  newProduct,
  getProductDetails,
  updateProduct,
};
