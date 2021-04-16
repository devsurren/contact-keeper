const express = require('express');
const {getAllContacts,createContact} = require('../controller/contactCC');
const {protectedRoute}=require('../middleware/protected');

const router = express.Router();

router.route('/').post(protectedRoute,createContact).get(protectedRoute,getAllContacts);


module.exports=router;