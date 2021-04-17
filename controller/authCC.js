//NPM modules
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('config');
//Cutsom modules
const Usermodel=require('../model/User');


exports.getCurrentLoggedinUser=async(req,res,next)=>{
    const token = req.header('x-auth-token');
    try{
        //Decode User id from jwt
        const decoded = jwt.verify(token,config.get("jwt_secret"));
        //Finiding User in the database
        const currentuser = await Usermodel.findById(decoded.user.id);
        //Sending Response for Unknow User
        if(!currentuser) return res.status(404).json({msg:"user not found"});
        //Sending Current Logged in User
        return res.status(200).json({currentuser});
    }catch(e){console.log(e.message);next();}
}


exports.loginUser=async(req,res,next)=>{
    const{ email,password  }=req.body
try {
      //Check user
  const user=await Usermodel.findOne({email});
  //if user not available
  if(!user) return res.staus(400).json({msg:"Invalid User"});
  //Compare password
  const authorizedUser= bcrypt.compare(password,user.password);
  //if the user not authorized
  if(!authorizedUser) return res.status(400).json({msg:"Username or password incorrect"});
 //Payload for the user
 const payload={
     user:{
         id:user.id
     }
 }
 //Sending Token for logged in user
 jwt.sign(payload,config.get("jwt_secret"),{ expiresIn:config.get('token_expire') },(err,token)=>{
     if(err) return res.status(500).json({msg:"Token Failed"})
     return res.status(200).json({success:true,msg:"User Logged In",token});
 });


} catch (error) {
    console.log(error.message);
    next();
}




}