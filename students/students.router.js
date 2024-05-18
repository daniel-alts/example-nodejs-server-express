const express = require('express');
const globalMiddlewares = require('../middlewares/global.middleware');
const middleware = require('./students.middlware')
const controller = require('./students.controller')

const router = express.Router();

// router.use(globalMiddlewares.basicAuth)
// router.use(globalMiddlewares.bearerTokenAuth)

// GET studtents
router.get('/', controller.GetStudents)

// POST students
router.post('/', globalMiddlewares.checkAdmin, middleware.CheckProgram, controller.CreateStudents)

// GET one /students/134
router.get('/:id', controller.getOneStudent)

// Update one /students/134
router.patch("/:id", globalMiddlewares.checkAdmin, controller.updateStudent)
    
// Delete one /students/134
router.delete("/:id", globalMiddlewares.checkAdmin, controller.deleteStudent )

module.exports = router
