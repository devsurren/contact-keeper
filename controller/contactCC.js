const contact=require('../model/Contact');

//Getting All Contacts for Current Logged in User
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

//Creating Contact in the DataBase
exports.createContact=async(req,res,next)=>{
    const { name,email,phone,type }=req.body;
    try{
        const contactcreated = await new contact({user:req.user.id,name,email,phone,type});
        if(!contactcreated) return res.status(400).json({msg:"Contact Creation Failed"});
       const savingdatabase= await contactcreated.save();
       if(!savingdatabase) return res.status(400).json({msg:"Saving DataBase Failed"});
     return res.status(201).json({success:true,msg:"Contact Created Succssful"})
    }catch(e){
        console.log(e.message);
        next(); }
}

//Update Contatc in DataBase
exports.updateContact=async(req,res,next)=>{

const{name,email,phone,type}=req.body;

console.log(req.body);

try{
  if(!req.params.id) return res.status(400).json({success:false,msg:"Need Resource Id"});
  const updatedcontact=await contact.findByIdAndUpdate(req.params.id,{name,email,phone,type});
  if (!updatedcontact) return res.status(500).json({success:false,msg:"Updation Failed"});
  return res.status(200).json({success:true,msg:"Contact Updated"});

}catch(error){
  console.log(error.message);
  next();
}

}

exports.deleteContact=async(req,res,next)=>{

try{
  if(!req.params.id) return res.status(400).json({success:false,msg:"Need Resource Id"});
  const deletedcontact=await contact.findByIdAndDelete(req.params.id);
  if (!deletedcontact) return res.status(500).json({success:false,msg:"Deletion Failed"});
  return res.status(200).json({success:true,msg:"Contact Deletedted"});

}catch(error){
  console.log(error.message);
  next();
}
}
