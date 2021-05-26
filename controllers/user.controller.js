const { User } = require("../models/user.model")
const { issueJWT, generateHash, isValidPassword } = require("../utils/security.utils")


const userLogin = async(req, res) => {
  try{
    const {email , password} = req.body;
    let user = await User.findOne({email:email},{__v:0});
    if(user){
      const match = await isValidPassword( password, user.password )
      if(match){
        const jwt = issueJWT(user._id)
        user.password = undefined;
        user._id = undefined;
        res.status(200).json({ 
          success:true, data:{user , token:jwt.token, expiresIn:jwt.expires} 
        })
      }else{
        res.status(200).json({ success:false, data:"Invalid Email/Password" })
      }
    }else{
      res.status(401).json({ success:false, data:"No User Exists with this Email" })
    }
  }catch(err){
    res.status(500).json({ success:false, error:"something went wrong" })
  }
}

const newUser = async(req, res) => {
  let user = req.body;
  try{
    if(user && user.password ){
      user.password = await generateHash(user.password)
      const NewUser = new User(user);
      const userSaved = await NewUser.save();
      res.status(201).json({success:true, data:"successfully added"})
    }else{
      throw Error("something went wrong")
    }
  }catch(err){
    res.status(500).json({ success: false, error: err.message})
  }
}
const userDetails = (req, res) => {
  let {user} = req;
  user.password = undefined;
  user._id = undefined;
  user.__v = undefined;
  res.status(200).json({success:true, data:user})
}
module.exports = {userDetails, newUser, userLogin  }