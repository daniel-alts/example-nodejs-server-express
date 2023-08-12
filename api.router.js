const express = require('express');
const middleware = require('./api.middlware')
const controller = require('./api.controller')

const router = express.Router();

// /studtents
router.get('/', controller.GetStudents)

router.post('/', middleware.CheckProgram, controller.CreateStudents)

router.get('/:id', (req, res) => {
    const id = req.params.id 

    // add code here
})

module.exports = router
