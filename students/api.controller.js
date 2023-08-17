const students = [];

// http://localhost:3002/students?search=daniel&department=soe
const GetStudents = (req, res) => {
    const query = req.query

    let studentsArrayDuplicate = students;
    if (query.progam) {
        studentsArrayDuplicate = studentsArrayDuplicate.filter(std => std.progam.includes(query.progam))
    }

    if (query.limit) {
        studentsArrayDuplicate = studentsArrayDuplicate.slice(0, req.limit - 1)
    }

    if (query.search) {
        studentsArrayDuplicate = studentsArrayDuplicate.filter(std => std.progam.includes(query.search) || std.name.includes(query.search) || std.department.includes(query.search))
    }

    res.status(200).json({
        data: studentsArrayDuplicate,
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