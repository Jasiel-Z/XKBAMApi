const {check, validationResult} = require('express-validator');
const { usuario } = require('../models');


const validateAccount = [
    check('tarjetabancaria')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({max : 50 }).withMessage('Se ha excedido el máximo de caracteres')
        .trim().escape(),

    check('titular')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({max : 50 }).withMessage('Se ha excedido el máximo de caracteres')
        .trim().escape(),

    check('fechaExpiracion')
        .notEmpty().withMessage('Campos vacíos')
        .isDate().withMessage('Tipo de dato no aceptado')
        .custom((fechaExpiracion) => {
            const today = new Date();
            if(fechaexpiracion < hoy )
                return Promise.reject('La tarjeta ya ha expirado');
            
            return true;
        }),

    check('usuario')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt()
        .custom( async usuario => {
            const user = await usuario.findByPk(usuario);
            if(!user)
                return Promise.reject('Usuario no encontrado');
        }),

    (req, res, next) => {
        const errors = validateAccount(req);
        if(!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        next();
    }

]

module.exports = { validateAccount }