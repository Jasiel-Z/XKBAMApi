const Joi = require('joi');

const joiValidation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: 'Solicitud no válida',
                errors: error.details.map(detail => detail.message)
            });
        }
        next();
    };
};

module.exports = joiValidation;