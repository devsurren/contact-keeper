const contact=require('../model/Contact');

exports.getAllContacts=async(req,res,next)=>{
 try {
     const allcontacts=await contact.find({user:req.user.id});
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
        const contactcreated = await new contact({name,email,phone,type});
        if(!contactcreated) return res.status(400).json({msg:"Contact Creation Failed"});
       const savingdatabase= await contactcreated.save();
       if(!savingdatabase) return res.status(400).json({msg:"Saving DataBase Failed"});
      res.status(200).json({success:true,msg:"User Created Succssful"})
    }catch(e){
        next();
        console.log(e.message) }
}