const contact=require('../model/Contact');

exports.getAllContacts=async(req,res,next)=>{
 try {
     const allcontacts=await contact.find({user:req.user.userid});
     if(!allcontacts) return res.status(400).json({msg:"No Contacts Found"});
     return res.status(200).json({success:true,contacts:allcontacts});
 } catch (error) {
     console.log(error.message);
     next();
 }
}

exports.createContact=async(req,res,next)=>{
    const { name,email,phone,type }=req.body;
    try{
        console.log(req.user);
        const contactcreated = await new contact({user:req.user._id,name,email,phone,type});
        if(!contactcreated) return res.status(400).json({msg:"Contact Creation Failed"});
       const savingdatabase= await contactcreated.save();
       if(!savingdatabase) return res.status(400).json({msg:"Saving DataBase Failed"});
     return res.status(200).json({success:true,msg:"Contact Created Succssful"})
    }catch(e){
        console.log(e.message);
        next(); }
}