const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = Schema({
  userId: {
    type: Schema.ObjectId,
    ref: "User",
    required: "User Id must be Required",
  },
  name: {
    type: String,
    required: "Name must be Required",
  },
  mobileNumber: {
    type: String,
    required: "Mobile Number must be Required",
  },
  pincode: {
    type: String,
    required: "Pincode Number must be Required",
  },
  address: {
    type: String,
    required: "Address Number must be Required",
  },
  city: {
    type: String,
    required: "City must be Required",
  },
  state: {
    type: String,
    required: "State must be Required",
  },
});

const Address = mongoose.model("Address", AddressSchema);
module.exports = { Address };
