const Joi = require('joi');


module.exports.addCustomer = (req, res, next) => {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required(),
        mobileNumber: Joi.number().required(),
        password:Joi.string(),
        confirmPassword:Joi.string(),
        status: Joi.number().required(),
        mailStatus:Joi.number().required(),
        newsletter:Joi.number().required(),
        customerGroupId:Joi.number().required(),
        avatar:Joi.any(),

    });
    
    Joi.validate(
        req.body,
        schema,
        { convert: true },
        (err, value) => {
            if (err) {
                return res.status(400).json({
                    message: err.details[0] && err.details[0].message ? err.details[0].message : 'Bad request'
                });
            } else {
                next();
            }
        }
    );
};



module.exports.updateCustomer = (req, res, next) => {
    const schema = Joi.object().keys({
        customerId:Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        mobileNumber: Joi.number().required(),
        password:Joi.string(),
        confirmPassword:Joi.string(),
        status: Joi.number().required(),
        mailStatus:Joi.number().required(),
        newsletter:Joi.number().required(),
        customerGroupId:Joi.number().required(),
        avatar:Joi.any(),

    });
    
    Joi.validate(
        req.body,
        schema,
        { convert: true },
        (err, value) => {
            if (err) {
                return res.status(400).json({
                    message: err.details[0] && err.details[0].message ? err.details[0].message : 'Bad request'
                });
            } else {
                next();
            }
        }
    );
};
