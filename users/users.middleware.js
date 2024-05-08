const joi = require('joi')
const Validator = require('validatorjs')

const ValidateUserCreationWithJoi = async (req, res, next) => {
    try {
        const bodyofRequest = req.body;
        const schema = joi.object({
            name: joi.string().optional(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9@#]{3,30}$')).required(),
            email: joi.string().email().required(),
            contact: joi.string().required(),
            phone_number: joi.string().required(),
            gender: joi.string().valid('male', 'female'),
            access_token: joi.array().items(joi.string().valid('x', 'y', 'z')),
            address: joi.object({
                // age: joi.number().min(21).max(35).optional(),
                home: joi.string(),
                city: joi.string().empty(),
                country_code: joi.string()
            })
        })

        await schema.validateAsync(bodyofRequest, { abortEarly: true })

        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}

const ValidateUserCreationWithValidatorJs = async (req, res, next) => {
    let data = req.body;
      
      let rules = {
        name: 'required|string',
        password: 'required|min:6|max:30',
        email: 'required|email',
        contact: 'required|string',
        phone_number: 'required|min:10|max:11',
        gender: 'required|string',
        address: {
            house_number: 'numeric',
            home: 'required|string',
            city: 'required|string',
            country_code: 'required|string'
        }
      };
      
      let validation = new Validator(data, rules);

      if (!validation.passes()) {
        return res.status(422).json({
            message: validation.errors.errors,
            success: false
        })
      }

      next()
      
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
    ValidateUserCreationWithJoi,
    ValidateUserCreationWithValidatorJs,
    LoginValidation
}