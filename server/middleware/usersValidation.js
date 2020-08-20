const Joi = require('@hapi/joi');

function userValidation(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    const result = userValidation.validate(req.body);
    // console.log(error);
    if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
    next();
}

function loginValidation(req, res, next) {
    const login = Joi.object({
        //name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    })
    const result = loginValidation.validate(req.body);
    // console.log(error);
    if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
    next();
}
//module.exports = loginValidation;
module.exports = userValidation;