const passport = require("passport");

const ensureAuthenticated = async( req, res, next)=>{
  console.log(req.isAuthenticated(), {tt:req.isAuthenticated})
  if(req.isAuthenticated()){
    next();
  }else{
    res.status(401).json({success:false, error:'Invalid Token' })
  }
  return 
}
module.exports = { ensureAuthenticated }