const express = require('express');

const router = express.Router();

router.route('/').get(getAllContacts).post(createContact)


module.exports=router;