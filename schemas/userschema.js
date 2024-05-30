const Joi = require('joi');

const accountSchema = Joi.object({
    contrasena: Joi.string().required().messages({
        'any.required': 'La contraseña es obligatoria'
    }), 
    correo: Joi.string().required().messages({
        'any.required': 'El correo es obligatorio'
    }), 
    idRol: Joi.number().integer().required().messages({
        'any.required': 'El rol es obligatorio'
    }), 


});



module.exports = { accountSchema };