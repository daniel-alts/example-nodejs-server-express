const express = require('express');
const studentsrouter = require('./students/students.router');
const programRouter = require('./progams/program.router')
const userRouter = require('./users/users.router')
const viewRouter = require('./views/views.router')
const UserModel = require('./models/user.model');
const morgan = require('morgan');
const logger = require('./logger');
const redisClient = require('./integrations/redis');

const fs = require('fs');
const { profile } = require('console');
const rateLimit = require('express-rate-limit');

// multer
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cloudinary = require('./integrations/cloudinary');


const app = express()

// x-device-id

// configure rate limiter
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 24 hrs
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
    keyGenerator: function (req) {
        return req.headers['x-device-id'] || req.user.id || req.ip
    },
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header.
});

// (req, res, next) => {
// Apply the rate limiting middleware to all requests.
// app.use(limiter)

app.use(morgan('dev'));


app.use(express.json()) // body parser
app.use(express.urlencoded({ extended: true })); // body prser: formdata


app.set('view engine', 'ejs')

app.use('/views', viewRouter)

// app.post('/file/upload', upload.single('photo'), async (req, res, next) => {
//     console.log(req.file)
//     // return response
//     return res.json({
//         message: 'file uploaded successfully',
//         error: null
//     })
// })



app.post('/file/upload', upload.single('photo'), async (req, res, next) => {

    try {
        console.log(req.file)

        // upload file to cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path)
          
        // delete file from file directory
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        // response
        const resexample  = {
            "asset_id": "2c0911e74485d4fa3f274563b053286c",
            "public_id": "kr7woaeblwlautl3k53n",
            "version": 1715193094,
            "version_id": "5bf3e0b0198260fa23c1dea12bd95ffa",
            "signature": "368049724ff3c96cd01938614cef21ba45f30c68",
            "width": 1600,
            "height": 900,
            "format": "png",
            "resource_type": "image",
            "created_at": "2024-05-08T18:31:34Z",
            "tags": [],
            "bytes": 726191,
            "type": "upload",
            "etag": "7168a51a422beac728016f7f2f9f0627",
            "placeholder": false,
            "url": "http://res.cloudinary.com/dt40xxwe4/image/upload/v1715193094/kr7woaeblwlautl3k53n.png",
            "secure_url": "https://res.cloudinary.com/dt40xxwe4/image/upload/v1715193094/kr7woaeblwlautl3k53n.png",
            "folder": "",
            "original_filename": "b6bfbf1dd75dff535c149c5a7f0b4b03",
            "api_key": "992659252339482"
          }

    
    
        // return response
        return res.json({
            data: cloudinaryResponse,
            error: null
        })
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: 'Server Error',
            errorData: error
        })
    }
    

})


const homeRouteLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 1000, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header.
});

// home route
app.get('/', homeRouteLimiter, (req, res) => {
    logger.info("Home route accessed")
    return res.status(200).json({ message: 'success', status: true })
})

// application caching layer

// database caching layer

app.get('/users', async (req, res) => {
    const query = req.query

    const whereQuery = {};
    const limit = query.per_page || 10
    const page = query.page || 0

    if (query.name) {
        whereQuery.name = query.name
    }

    if (query.email) {
        whereQuery.email = query.email
    }

    // check cache
    const cacheKey = `users:${JSON.stringify(whereQuery)}:${limit}:${page}`

    // get data from database
    const data = await redisClient.get(cacheKey)


    // cache miss
    if (data) {
        console.log('returning data from cache')
        return res.json({
            data: JSON.parse(data),
            error: null
        })
    }


    console.log('returning data from database')
    const users = await UserModel.find(whereQuery).limit(limit).skip(page).exec()

    // set cache
    await redisClient.setEx(cacheKey, 1 * 60 ,JSON.stringify(users))

    return res.json({
        users
    })

})

app.post('/users', async (req, res) => {
    await redisClient.del('/users')

    await UserModel.create(req.body)
    await UserModel.update()
})  

// app.get('/', limiter, (req, res) => res.json({ message: 'Welcome'}))

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

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })
})

module.exports = app;
