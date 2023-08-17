const express = require('express');
const middlware = require('./program.middleware')
const globalMiddlewares = require('../middlewares/global.middleware')
const controller = require('./program.controller')

const router = express.Router();


router.get('/' , globalMiddlewares.checkBody, controller.GetPrograms)

const programs = [
    {
        name: 'nodejs',
        amount: 10,
        id: 1
    },
    {
        name: 'pyhton',
        amount: 10,
        id: 2
    }
]
router.patch('/:id' , middlware.checkBody, controller.UpdateProgram)
router.put('/:id' , middlware.checkBody, controller.UpdateProgram)


module.exports = router;