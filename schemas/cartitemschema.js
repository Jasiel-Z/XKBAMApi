const Joi = require('joi');

const cartItemSchema = Joi.object({
    cantidadArticulo: Joi.number().integer().min(1).max(10).required().messages({
        'any.required': 'Se requiere la cantidad del artículo',
        'number.integer': 'La cantidad debe ser un número entero',
        'number.min': 'La cantidad mínima es 1',
        'number.max': 'La cantidad máxima es 10'
    }),
    precioUnitario: Joi.number().required().messages({
        'any.required': 'Se requiere el precio unitario del artículo'
    }),
    precioFinal: Joi.number().required().messages({
        'any.required': 'Se requiere el precio final del artículo'
    }),
    codigoArticulo: Joi.string().required().messages({
        'any.required': 'Se requiere el código del artículo'
    }),
    idCarrito: Joi.number().integer().required().messages({
        'any.required': 'Se requiere el id del carrito del cliente',
    }),
    idTalla: Joi.number().integer().min(1).max(5).required().messages({
        'any.required': 'Se requiere el id de la talla del artículo',
        'number.integer': 'El id de la talla debe ser un número entero',
        'number.min': 'El id de la talla mínima es 1',
        'number.max': 'El id de la talla máxima es 5'
    })
});

module.exports = { cartItemSchema }