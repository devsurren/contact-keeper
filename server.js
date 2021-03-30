const express = require('express');
const moragan= require('morgan');
const config = require('config');
const{connectDatabase}=require('./config/config')

//Routes
const userRoutes=require('./routes/user');
const authRoutes=require('./routes/auth');
const contactRoutes=require('./routes/contact');

const app =  express();

app.use(express.json());

app.use(moragan('tiny'));

//Test
app.get("/test",(req,res,next)=>{
    res.status(200).json({msg:"Api hit Success"})
})


//Mounting Routes

app.use('/api/v1/signup',userRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/contact',contactRoutes);


app.listen(config.get("port"),()=>{
    connectDatabase();
    console.log(`Server Running On Port ${config.get("port")}`)
}
)


