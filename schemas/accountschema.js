const Joi = require('joi');

const userSchema = Joi.object({
    usuario: Joi.string().required().messages({
        'any.required': 'El nombre de usuario es obligatorio'
    }),
    nombre: Joi.string().required().messages({
        'any.required': 'El nombre es obligatorio'
    }),
    apellidoPaterno: Joi.string().required().messages({
        'any.required': 'El apellido es obligatorio'        
    }),
    apellidoMaterno: Joi.string().required().messages({
        'any.required': 'El apellido es obligatorio'        
    }),
    genero: Joi.number().integer().required().messages({
        'any.required': 'El género es un campo obligatorio'
    }),
    cuenta: Joi.object({
        correo: Joi.string().required().email().messages({
            'any.required': 'El correo es obligatorio',
            'string.email': 'El formato del correo no es válido'
        }),
        contrasena: Joi.string().required().messages({
            'any.required': 'La contraseña es obligatoria'
        }),
        idRol: Joi.number().integer().required().messages({
            'any.required': 'El rol es obligatorio'
        })
    }).required().messages({
        'any.required': 'Los datos de la cuenta son obligatorios'
    })
});

module.exports = { userSchema };
