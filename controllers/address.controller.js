const { Address } = require("../models/address.model");

const getUserAddresses = async (req, res) => {
  try {
    const { user } = req;
    const userAddress = await Address.find({ userId: user._id });
    res.status(200).json({ data: userAddress });
  } catch (err) {
    res.status(503).json({ error: "something went wrong" });
  }
};
const addAddress = async (req, res) => {
  try {
    const { user } = req;
    const address = req.body;
    const newAddress = new Address({ userId: user._id, ...address });
    await newAddress.save();
    res.status(201).json({ data: "Address Added" });
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: "something went wrong" });
  }
};

module.exports = { getUserAddresses, addAddress };
