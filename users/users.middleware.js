const joi = require('joi')

const ValidateUserCreation = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().required(),
            password: joi.string().required(),
            email: joi.string().email().required(),
            contact: joi.string().required(),
            phone_number: joi.string().required(),
            gender: joi.string().valid('male', 'female'),
        })

        await schema.validateAsync(req.body, { abortEarly: true })
    
        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}

const LoginValidation = async (req, res, next) => {
    try {
        const schema = joi.object({
            password: joi.string().required(),
            email: joi.string().email().required(),
        })

        await schema.validateAsync(req.body, { abortEarly: true })
    
        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}


module.exports = {
    ValidateUserCreation,
    LoginValidation
}