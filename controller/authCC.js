//NPM modules
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('config');
//Cutsom modules
const Usermodel=require('../model/User');

exports.loginUser=async(req,res,next)=>{
    const{ email,password  }=req.body
try {
      //Check user
  const user=await Usermodel.findOne({email});
  //if user not available
  if(!user) return res.staus(400).json({msg:"Invalid User"});
  //Compare password
  const authorizedUser=await bcrypt.compare(password,user.password);
  //if the user not authorized
  if(!authorizedUser) return res.status(400).json({msg:"Username or password incorrect"});
 //Payload for the user
 const payload={
     user:{
         userid:user.id
     }
 }
 //Sending Token for logged in user
 jwt.sign(payload,config.get("jwt_secret"),{ expiresIn:config.get('token_expire') },(err,token)=>{
     if(err) return res.status(500).json({msg:"Token Failed"})
     return res.status(200).json({success:true,token});
 });


} catch (error) {
    console.log(error.message);
    next();
}




}