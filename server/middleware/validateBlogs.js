   const Joi = require('@hapi/joi');

   function bValidate(req, res, next) {
       const blogsValidation = Joi.object({
           title: Joi.string().min(6).required(),

           photoUrl: Joi.string().uri({ scheme: 'https' }),
           description: Joi.string().min(10).max(200).required()

       });
       const result = blogsValidation.validate(req.body);
       // console.log(error);
       if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
       next();
   }
   module.exports = bValidate;