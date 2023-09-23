const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

require('dotenv').config()


const CreateUser = async (req, res) => {
    const userFromRequest = req.body

    const existingUser = await UserModel.findOne({
        email: userFromRequest.email
    });

    if (existingUser) {
        return res.status(409).json({
            message: 'User already created',
        })
    }

    const user = await UserModel.create({
        name: userFromRequest.name,
        password: userFromRequest.password,
        email: userFromRequest.email,
        contact: userFromRequest.contact,
        phone_number: userFromRequest.phone_number,
        gender: userFromRequest.gender
    });

    const token = await jwt.sign({ email: user.email, _id: user._id}, process.env.JWT_SECRET)

    return res.status(201).json({
        message: 'User created successfully',
        user,
        token
    })
}


const Login = async (req, res) => {
    const userFromRequest = req.body

    const user = await UserModel.findOne({
        email: userFromRequest.email,
    });

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        }) 
    }

    const validPassword = await user.isValidPassword(userFromRequest.password)

    if (!validPassword) {
        return res.status(422).json({
            message: 'Email or password is not correct',
        }) 
    }

    const token = await jwt.sign({ email: user.email, _id: user._id}, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' })

    return res.status(200).json({
        message: 'Login successful',
        user,
        token
    })

}


module.exports = {
    CreateUser,
    Login
}