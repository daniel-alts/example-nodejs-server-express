const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const logger = require('../logger');

const Login = async ({ email, password }) => {
    logger.info('[CreateUser] => login process started')
    const userFromRequest = { email, password }

    const user = await UserModel.findOne({
        email: userFromRequest.email,
    });

    if (!user) { 
        return {
            message: 'User not found',
            code: 404
        }
    }

    const validPassword = await user.isValidPassword(userFromRequest.password)

    if (!validPassword) {
        return {
            message: 'Email or password is not correct',
            code: 422,
        }
    }

    const token = await jwt.sign({ email: user.email, _id: user._id}, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' })

        return {
            message: 'Login successful',
            code: 200,
            data: {
                user,
                token
            }
        }
}

module.exports = {
    Login
}