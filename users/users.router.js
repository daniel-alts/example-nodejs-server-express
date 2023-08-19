const express = require('express');
const middleware = require('./users.middleware')
const controller = require('./users.controller')

const router = express.Router();


// Create user
router.post('/', middleware.ValidateUserCreation, controller.CreateUser)


module.exports = router
