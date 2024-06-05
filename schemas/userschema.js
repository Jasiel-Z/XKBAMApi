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



const updateUserSchema = Joi.object({
    usuario: Joi.object({
        usuario: Joi.string().alphanum().min(6).max(30).optional().messages({
            'string.alphanum': 'El nombre de usuario debe contener solo caracteres alfanuméricos',
            'string.min': 'El nombre de usuario debe tener al menos 6 caracteres',
            'string.max': 'El nombre de usuario no puede exceder los 30 caracteres'
        }),
        nombre: Joi.string().max(50).optional().messages({
            'string.max': 'El nombre no puede contener más de 50 caracteres'
        }),
        apellidoPaterno: Joi.string().max(50).optional().messages({
            'string.max': 'El apellido paterno no puede contener más de 50 caracteres'
        }),
        apellidoMaterno: Joi.string().max(50).optional().messages({
            'string.max': 'El apellido materno no puede contener más de 50 caracteres'
        }),
        genero: Joi.number().integer().valid(1, 2).optional().messages({
            'number.integer': 'El género debe ser un número entero',
            'any.only': 'El valor del género debe ser 1 o 2'
        })
    }).optional()
});
module.exports = { accountSchema, updateUserSchema };
