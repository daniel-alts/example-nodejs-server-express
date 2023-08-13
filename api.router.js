const express = require('express');
const middleware = require('./api.middlware')
const controller = require('./api.controller')

const router = express.Router();

// /studtents
router.get('/', controller.GetStudents)

router.post('/', middleware.CheckProgram, controller.CreateStudents)

router.get('/:id', (req, res) => {
    const id = req.params.id 
    const students = controller.students
    const foundStudent = students.find((student)=>{
        return student.id == parseInt(id)
    })
    if(!foundStudent){
        res.status(404).send(`Item not found`)
    }
    res.status(200).json(foundStudent)
})

router.patch("/:id", (req,res)=>{
    const id = req.params.id
    const update = req.body
    const students = controller.students
    const foundIndex = students.findIndex(student=>student.id == parseInt(id))
    if(foundIndex== -1){
        res.end(`student with id ${id} is not found`)
        return
    }
    students[foundIndex] = {...students[foundIndex], ...update}
    res.status(200).json(students[foundIndex])
})


router.delete("/:id", (req,res)=>{
    const id = req.params.id
    const students = controller.students
    const foundIndex = students.findIndex(student=>student.id == parseInt(id))
    if(foundIndex== -1){
        res.end(`student with id:${id} is not found`)
        return
    }
    students.splice(foundIndex, 1)
    res.end(`student with id:${id}, deleted successfully`)
})

module.exports = router
