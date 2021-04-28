const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{
    type:String,
    required:"Name must Required"
  },
  email:{
    type:String,
    required:"Name must Required",
    unique:[true,"email is alreay used"],
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password:{
    type:String,
    required:"password Required",
  },
  image:{
    type:String,
  }
}) 
const User = mongoose.model("User", UserSchema);
module.exports = { User }