const express = require('express');
const studentsrouter = require('./students/students.router');
const programRouter = require('./progams/program.router')
const userRouter = require('./users/users.router')
const viewRouter = require('./views/views.router')
const UserModel = require('./models/user.model');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cloudinary = require('./integrations/cloudinary');
const fs = require('fs');
const { profile } = require('console');


const app = express()

// configure rate limiter
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 1, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use(morgan('dev'));


app.use(express.json()) // body parser
app.use(express.urlencoded({ extended: true })); // body prser: formdata


app.set('view engine', 'ejs')

app.use('/views', viewRouter)


app.post('/file/upload', upload.single('file'), async (req, res, next) => {
    

    // upload file to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path)
      
    // delete file from file directory
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })

    // return response
    return res.json({
        data: cloudinaryResponse,
        error: null
    })
})


const homeRouteLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header.
});

// home route
app.get('/', homeRouteLimiter, (req, res) => {
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
