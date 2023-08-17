const express = require('express');
const middleware = require('./api.middlware')
const controller = require('./api.controller')

const router = express.Router();

// /studtents
router.get('/', controller.GetStudents)

router.post('/', middleware.CheckProgram, controller.CreateStudents)

router.get('/:id', controller.getOneStudent)

router.patch("/:id", controller.updateStudent)
    
router.delete("/:id", controller.deleteStudent )


module.exports = router
