const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user.model")
const PUBLIC_KEY = process.env['PUBLIC_KEY']


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY,
  algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, async(payload, done) =>{
  try{
    const user = await User.findOne({ _id:payload.sub })
    if(user){
      return done(null, user)
    }else{
      return done(null, false)
    }
  }catch(err){
    done(err, null)
  }
})



module.exports = (passport) =>{
  passport.use(strategy)
} 