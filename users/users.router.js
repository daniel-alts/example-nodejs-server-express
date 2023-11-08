const express = require('express');
const middleware = require('./users.middleware')
const controller = require('./users.controller')

const router = express.Router();


// Create user
router.post('/signup', middleware.ValidateUserCreationWithJoi, controller.CreateUser)

// Signin user
router.post('/login', middleware.LoginValidation, controller.Login)


module.exports = router
