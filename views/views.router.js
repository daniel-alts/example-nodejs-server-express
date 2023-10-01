const express = require('express');
const userService = require('../users/users.services');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const router = express.Router();

router.use(cookieParser())

router.get('/index', (req, res) => {
    res.render('index')
})


router.use(async (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        try {
            const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);

            console.log({ decodedValue })

            res.locals.user = decodedValue
            next()
        } catch (error) {
            res.redirect('index')
        }
    } else {
        res.redirect('index')
    }
})


router.post('/login', async (req, res) => {
    const response = await userService.Login({ email: req.body.email, password: req.body.password })

    if (response.code === 200) {
        // set cookie
        res.cookie('jwt', response.data.token, { maxAge: 360000 })
        res.redirect('home')
    } else {
        res.render('index')
    }
});

router.get('/home', (req, res) => {
    res.render('home');
})

module.exports = router;
