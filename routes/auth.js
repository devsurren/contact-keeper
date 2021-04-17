const express = require('express');
const {loginUser,getCurrentLoggedinUser} = require('../controller/authCC');
const{protectedRoute}=require('../middleware/protected');
const { errorsResponse  }=require('../middleware/errorresponse');
const { loginValidator  }=require('../errors/Errorschema');

const router = express.Router();

//Middleware Router
router.route('/').get(protectedRoute,getCurrentLoggedinUser).post(loginValidator,errorsResponse,loginUser);

module.exports=router;