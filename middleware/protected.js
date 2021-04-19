//NPM modules
const jwt=require('jsonwebtoken');
const config = require('config');

//DataBase
const user = require("../model/User");

exports.protectedRoute=async(req,res,next)=>{
  try {
    const token = req.header('x-auth-token');
   const decoded=jwt.verify(token,config.get('jwt_secret'));
   const authuser=await user.findById(decoded.user.id);
 if(!authuser) return res.status(400).json({msg:"Not an Authorized User"});
 req.user=authuser;
 next();
  } catch (error) {
   console.log(error.message);
   next();
  }

}
