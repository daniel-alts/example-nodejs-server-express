const db = require('../users/users.db')
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const checkBody = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({
            data: null,
            error: 'must have a body'
        })
    }

    next()
}


const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const base64 = new Buffer.from(authHeader.split(' ')[1], 'base64')
    const base64ToString = base64.toString()
    const usernameAndPassword =  base64ToString.split(':');
    const auth = usernameAndPassword;

    const username = auth[0];
    const password = auth[1];
 
    const existingUser = db.users.find(user => user.username === username && user.password === password)
    if (existingUser) {
        req.user = existingUser
        next();
    } else {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

}

const apiKeyAuth = (req, res, next) => {
    const authHeader = req.headers;

    if (!authHeader.api_key) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const existingUser = db.users.find(user => user.api_key === authHeader.api_key)
    if (existingUser) {
        req.user = existingUser
        next();
    } else {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }
}

const bearerTokenAuth = async (req, res, next) => {
    try {
    const authHeader = req.headers;

    if (!authHeader.authorization) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const token = authHeader.authorization.split(' ')[1]; // berear tokenvalue

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    // console.log({ decoded })

    // decoded { email: someemail@mail.com, _id: jshkdf }

    const user = await UserModel.findOne({ _id: decoded._id })
    
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }

    req.user = user;

    next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
}

const checkAdmin = (req, res, next) => {
    if (req.user.user_type !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized!' });
    }

    next()
}

module.exports = {
    checkBody,
    basicAuth,
    apiKeyAuth,
    checkAdmin,
    bearerTokenAuth,
}
