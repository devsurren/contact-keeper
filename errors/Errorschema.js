const {body}=require('express-validator');

exports.signUpValidator=[
    body('name').exists({checkFalsy:true,checkNull:true})
    .withMessage('Name field must not be null'),
    body('email').exists({checkFalsy:true,checkNull:true}).isEmail()
    .withMessage('Email field must not be null'),
    body('password').exists({checkFalsy:true,checkNull:true}).isLength({min:6})
    .withMessage('Password field atleast')
];

exports.loginValidator=[
    body('email').exists({checkFalsy:true,checkNull:true}).isEmail(),
    body('password').exists({checkFalsy:true,checkNull:true}).isLength({min:6})
];