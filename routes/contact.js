const express = require('express');
const {getAllContacts,createContact,updateContact,deleteContact} = require('../controller/contactCC');
const {protectedRoute}=require('../middleware/protected');

const router = express.Router();

//Middleware Router
router.route('/').post(protectedRoute,createContact).get(protectedRoute,getAllContacts)
router.route('/:id').put(protectedRoute,updateContact).delete(protectedRoute,deleteContact);


module.exports=router;
