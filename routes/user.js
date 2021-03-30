const express = require('express');
const {createUser}=require('../controller/userCC')

//Middleware Router
const router = express.Router();

router.post("/",createUser);

module.exports=router;