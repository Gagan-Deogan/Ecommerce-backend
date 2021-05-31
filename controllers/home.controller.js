const { Category } = require("../models/category.model");
const { Product } = require("../models/product.model");

const excludeFields = {
  fastDelivery: 0,
  catagoryid: 0,
  rating: 0,
  label: 0,
  description: 0,
  __v: 0,
  categoryId: 0,
};
const populateOptions = {
  path: "products",
  options: {
    limit: 4,
  },
  select: "_id name price discount effectivePrice image avalibility",
};

exports.getHomeData = async (req, res) => {
  try {
    // best seller
    const bestSellers = await Product.find(
      { label: "Best Seller" },
      excludeFields
    ).limit(4);

    // best deals
    const bestDeals = await Product.find(
      { discount: { $gte: 5 } },
      excludeFields
    ).limit(4);

    // tools
    const categoryTools = await Category.findOne({ name: "Tools" }).populate(
      populateOptions
    );

    // plants
    const categoryPlants = await Category.findOne({ name: "Plants" }).populate(
      populateOptions
    );

    res
      .status(200)
      .json({
        success: true,
        data: {
          bestSellers,
          bestDeals,
          tools: categoryTools.products,
          plants: categoryPlants.products,
        },
      });
  } catch (err) {
    res.status(503).json({ success: false, error: err.message });
  }
};
