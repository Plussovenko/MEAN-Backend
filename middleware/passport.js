const  mongoose  = require('mongoose');
const User = mongoose.model('users');

const keys = require('../config/keys');

const JwtStategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

module.exports = function (passport){
  passport.use(
    new JwtStategy(options, async (payload, done) =>{
      const user = await User.findById(payload.userId).select('email id')
      try {
        if(user){
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (error) {
        console.log(error)
      }
    })
  )
}