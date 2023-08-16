const students = [];

const GetStudents = (req, res) => {
    res.status(200).json({
        data: students,
        error: null
    })
}

const CreateStudents = (req, res) => {

    const student = req.body;
    students.push(student)

    return res.status(201).json({
        data: students,
        error: null
    })
}

const getOneStudent = (req,res)=>{
    const id = req.params.id 
    const foundStudent = students.find((student)=>{
        return student.id == parseInt(id)
    })
    if(!foundStudent){
        res.status(404).send(`Item not found`)
    }
    res.status(200).json(foundStudent)
}

const updateStudent = (req, res)=>{
    const id = req.params.id
    const update = req.body
    const foundIndex = students.findIndex(student=>student.id == parseInt(id))
    if(foundIndex== -1){
        res.end(`student with id ${id} is not found`)
        return
    }
    students[foundIndex] = {...students[foundIndex], ...update}
    res.status(200).json(students[foundIndex])
}

const deleteStudent = (req,res)=>{
    const id = req.params.id
    const foundIndex = students.findIndex(student=>student.id == parseInt(id))
    if(foundIndex== -1){
        res.end(`student with id:${id} is not found`)
        return
    }
    students.splice(foundIndex, 1)
    res.end(`student with id:${id}, deleted successfully`)
}

module.exports = {
    GetStudents,
    CreateStudents,
    getOneStudent,
    updateStudent,
    deleteStudent
}