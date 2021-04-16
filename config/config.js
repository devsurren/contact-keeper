const mongoose = require('mongoose');
const config = require('config');

exports.connectDatabase=async()=>{
 try{
  const databaseConnected =await mongoose.connect(config.get("database_uri"),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true
   })
  if(databaseConnected) console.log('DataBase Online');
 }
 catch(e){
    console.log(e.message)
 }
}