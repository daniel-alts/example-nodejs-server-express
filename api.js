const express = require('express');
const studentsrouter = require('./students/students.router');
const programRouter = require('./progams/program.router')
const userRouter = require('./users/users.router')
const UserModel = require('./models/user.model');
const morgan = require('morgan');


const app = express()

app.use(morgan('dev'));


app.use(express.json()) // body parser

// home route
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'success', status: true })
})

app.get('/users', async (req, res) => {
    const users = await UserModel.find({ email: 'daniel@example.com' }).limit(2).select({ name: 1, contact: 1, _id: 1 })
    return res.json({
        users
    })
})

// GET http://localhost/students
// GET http://localhost/students/134/department
// GET http://localhost/students/134/program
// POST http://localhost/students
// PATCH http://localhost/students/123
// DELETE http://localhost/students/123
app.use('/students', studentsrouter)

// GET http://localhost/programs
// GET http://localhost/programs/134/department
// GET http://localhost/programs/134/program
// POST http://localhost/programs
// PATCH http://localhost/programs/123
// DELETE http://localhost/programs/123
app.use('/programs', programRouter)

app.use('/users', userRouter)

app.get('*', (req, res) => {
    return res.status(404).json({
        data: null,
        error: 'Route not found'
    })
})

// globah error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })
})

module.exports = app;
