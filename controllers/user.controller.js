const { User } = require("../models/user.model")
const bcrypt = require("bcrypt")
const saltRounds = 10;
exports.passwordsEncriptor = async(req, res, next) => {
  const { password } = req.body
  try{
    if(!password){
      throw Error("Something went worng")
    } 
    req.body.password = await bcrypt.hash(password, saltRounds);
    next()
  }catch(err){
    res.status(500).json({success:false, error : err.message})
  }
}
exports.userLogin = async(req, res)=>{
  try{
  const {email , password} = req.body;
  const user = await User.findOne({email:email},{_v:0});
  if(!user){
    res.status(200).json({ success:false, data:"No User Exists with this Email" })
  }else{
    const match = await bcrypt.compare( password, user.password )
    if(match){
      user.password = undefined;
      res.status(200).json({success:true, data:user})
    }else{
      res.status(200).json({ success:false, data:"Invalid Email/Password" })
    }
  }
  }catch(err){
    res.status(500).json({ success: false, error: err.message})
  }
}

exports.newUser = async(req, res)=>{
  try{
    const user = req.body;
    const NewUser = new User(user);
    const userSaved = await NewUser.save();
    res.status(201).json({success:true, data:"successfully added"})
  }catch(err){
    res.status(500).json({ success: false, error: err.message})
  }
}