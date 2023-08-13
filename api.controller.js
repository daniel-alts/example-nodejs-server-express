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

module.exports = {
    GetStudents,
    CreateStudents,
    students
}