import Joi from '@hapi/joi';

export function validateQueries(req, res, next) {
    const validate_Queries = Joi.object({
        name: Joi.string().min(3).required(),

        email: Joi.string().min(6).required().email(),
        query: Joi.string().min(5).max(200).required()

    });
    const result = validate_Queries.validate(req.body);
    if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
    next();
}
// module.exports = bValidate;