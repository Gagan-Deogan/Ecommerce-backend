const { Category } = require("../models/category.model");

const populateOptions = {
  path: "products",
  select:
    "_id name price discount effectivePrice image rating avalibility label",
};

exports.getProductByCategory = async (req, res) => {
  try {
    const { category } = req;
    const { products, name } = await category
      .populate(populateOptions)
      .execPopulate();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(503).json({ success: false, error: err.message });
  }
};
