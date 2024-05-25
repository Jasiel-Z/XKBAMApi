const Joi = require('joi');

const userSchema = Joi.object({
    nombreusuario: Joi.string().required().messages({
        'any.required': 'El nombre de usuario es obligatorio'
    }),
    nombre: Joi.string().required().messages({
        'any.required': 'El nombre es obligatorio'
    }),
    apellidopaterno: Joi.string().required().messages({
        'any.required': 'El apellido es obligatorio'        
    }),
    apellidomaterno: Joi.string().required().messages({
        'any.required': 'El apellido es obligatorio'        
    }),
    genero: Joi.number().integer().required().messages({
        'any.required': 'El género es un campo obligatorio'
    })

});


module.exports = { userSchema }