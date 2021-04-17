const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    date: { type: Date, default: Date.now }
})

//Using Mongoose Middleware

userSchema.pre('save',async function(next){
    try{
        const salt = await bcrypt.genSalt(14);
       const hash=await bcrypt.hash(this.password,salt);
       this.password=hash;
    }
    catch(error){
        console.log(error)
    }
    next();
})


module.exports=mongoose.model('User',userSchema);