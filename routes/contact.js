const express = require('express');
const {getAllContacts,createContact,updateContact,deleteContact} = require('../controller/contactCC');
const {protectedRoute}=require('../middleware/protected');

const router = express.Router();

//Middleware Router
router.route('/').post(protectedRoute,createContact).get(protectedRoute,getAllContacts).put(protectedRoute,updateContact);
router.route('/:id').delete(protectedRoute,deleteContact);


module.exports=router;
