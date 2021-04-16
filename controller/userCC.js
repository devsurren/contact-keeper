//Package
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const userModel=require('../model/User');

exports.createUser=async(req,res,next)=>{
    const{ name,email,password }=req.body
    try {
        //Check if the user is already there 
        const userExsist = await userModel.findOne({email});
        if(userExsist) return res.status(400).json({success:false,msg:"User Already There"});
        
        //Create new user and save it
       const userCreation=await new userModel({name,email,password});
       await userCreation.save();
       
       //Hashing plain text password
       const salt =  bcrypt.genSaltSync(14);
       userCreation.password=bcrypt.hashSync(password,salt);
       
       //Payload for JsonWebToken
        const payload={
            user:{
                id:userCreation.id
            }
        }

        //Creating Json Web Token and Sending Response
        jwt.sign(payload,config.get("jwt_secret"),{
            expiresIn:360000
        },(err,token)=>{
            if(err) return res.status(400).json({success:false,msg:"Token failed"});
            if(token) return   res.status(201).json({
                success:true,
                msg:"User Created",
                token
            })
          
        });

    } catch (error) {
        console.log(error.message);
        next();
    }
   

   
}