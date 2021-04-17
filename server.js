//NPM modules
const express = require('express');
const moragan= require('morgan');
const config = require('config');
const jwt = require('jsonwebtoken');

//Cutsom modules
const{connectDatabase}=require('./config/config')
const user = require('./model/User');

//Routes
const userRoutes=require('./routes/user');
const authRoutes=require('./routes/auth');
const contactRoutes=require('./routes/contact');
const { cors }=require('./cors')

const app =  express();

app.use(express.json());

//CORS
app.use(cors);

app.use(moragan('tiny'));

//Test & Debug
app.get("/api/v1/test",(req,res,next)=>{
    res.status(200).json({msg:"Server online & Api hit Success"})
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


