const { User } = require("../models/user.model")

exports.userLogin = async(req, res)=>{
  try{
  const {email , password} = req.body;
  const user = await User.findOne({email:email, password:password},{password:0});
  if(!user){
    res.status(200).json({ success:false, error:"Invalid email/password" })
  }else{
    res.status(200).json({success:true, data:user})
  }
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}

exports.newUser = async(req, res)=>{
  try{
    const user = req.body;
    const NewUser = new User(user);
    const userSaved = await NewUser.save();
    res.status(201).json({success:true, data:"successfully added"})
  }catch(err){
    res.status(503).json({ success: false, error: err.message})
  }
}