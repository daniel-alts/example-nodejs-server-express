const express = require('express');
const studentsrouter = require('./students/students.router');
const programRouter = require('./progams/program.router')
const userRouter = require('./users/users.router')
const sequelize = require('./config/sequelize');
const User = require('./models/user')

const port = 3002;

const app = express()

app.use(express.json()) // body parser

app.get('/', async (req, res) => {

    // select * from users
    const users = await User.findAll()

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
    res.status(404).json({
        data: null,
        error: 'Route not found'
    })
})

sequelize.authenticate().then(() => {
    console.log('Connected to the db successfully!')
}).catch((err) => {
    console.log('Error connecting to db', err)
})


app.listen(port, () => console.log(`listening on port: ${port}`))