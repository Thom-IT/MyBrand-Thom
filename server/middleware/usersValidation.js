import Joi from '@hapi/joi';

export function userValidation(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    const result = schema.validate(req.body);
    // console.log(error);
    if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
    next();
}

export function loginValidation(req, res, next) {
    const login = Joi.object({
        //name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    })
    const result = login.validate(req.body);
    // console.log(error);
    if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
    next();
}
//module.exports = loginValidation;
//module.exports = userValidation;
//exports.userValidation = userValidation;
//exports.loginValidation = loginValidation;