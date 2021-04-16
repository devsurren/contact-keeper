const express = require('express');
const {createUser}=require('../controller/userCC');
const { errorsResponse  }=require('../middleware/errorresponse');
const { signUpValidator  }=require('../errors/Errorschema');



//Middleware Router
const router = express.Router();

router.route("/").post(signUpValidator,errorsResponse,createUser);

module.exports=router;