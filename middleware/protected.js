//NPM modules
const jwt=require('jsonwebtoken');
const config = require('config');

//DataBase
const user = require("../model/User");

exports.protectedRoute=(req,res,next)=>{
  try {
    const token = req.header('x-auth-token');
   const decoded=jwt.verify(token,config.get('jwt_secret'));
   const authuser=await user.findById({user:decoded.user.user});
 if(!authuser) return res.status(400).json({msg:"Not an Authorized User"});
 req.user=authuser;
 
  } catch (error) {
   console.log(error.message);
   next();   
  }

}
