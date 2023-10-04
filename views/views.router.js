const express = require('express');
const userService = require('../users/users.services');
const departmentService = require('../departments/department.services');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const router = express.Router();

router.use(cookieParser())

router.get('/index', (req, res) => {
    res.render('index', { user: res.locals.user || null });
})

router.post('/login', async (req, res) => {
    const response = await userService.Login({ email: req.body.email, password: req.body.password })

    if (response.code === 200) {
        // set cookie
        res.cookie('jwt', response.data.token)
        res.redirect('home')
    } else {
        res.render('index')
    }
});



router.use(async (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        try {
            const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);

            res.locals.user = decodedValue
            next()
        } catch (error) {
            res.redirect('index')
        }
    } else {
        res.redirect('index')
    }
})

// /views/logout
router.get('/logout', (req, res) => {    
    res.clearCookie('jwt')
    res.redirect('index')
});

router.get('/home', (req, res) => {
    console.log({ user: res.locals.user })
    res.render('home', { user: res.locals.user });
})

router.get('/department', async (req, res) => {
    const response = await departmentService.getDepartments();
    res.render('department', { 
        user: res.locals.user, 
        departments: response.data.departments
    });
})

router.get('/department/create', (req, res) => {
    res.render('departmentcreate', 
    { user: res.locals.user });
})

router.post('/department/create', async (req, res) => {
    console.log({ body : req.body })
    const response = await departmentService.createDepartment(req.body);


    if (response.code === 200) {
        res.redirect('/views/department')
    } else {
        res.render('departmentcreate', { error: response.message })
    }
})

module.exports = router;
