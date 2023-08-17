const express = require('express');
const middleware = require('./api.middlware')
const controller = require('./api.controller')

const router = express.Router();


// GET studtents
router.get('/', controller.GetStudents)

// POST students
router.post('/', middleware.CheckProgram, controller.CreateStudents)

// GET one /students/134
router.get('/:id', controller.getOneStudent)

// Update one /students/134
router.patch("/:id", controller.updateStudent)
    
// Delete one /students/134
router.delete("/:id", controller.deleteStudent )

module.exports = router
