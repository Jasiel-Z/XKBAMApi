const {check, validationResult} = require('express-validator');
const { usuario } = require('../models');


const validateAccount = [
    check('numerocuenta')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({max : 50 }).withMessage('Se ha excedido el máximo de caracteres')
        .trim().escape(),

    check('titular')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({max : 50 }).withMessage('Se ha excedido el máximo de caracteres')
        .trim().escape(),

    check('fechaexpiracion')
        .notEmpty().withMessage('Campos vacíos')
        .isDate().withMessage('Tipo de dato no aceptado')
        .custom((fechaexpiracion) => {
            const today = new Date();
            if(fechaexpiracion < hoy )
                return Promise.reject('La tarjeta ya ha expirado');
            
            return true;
        }),

    check('idusuario')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt()
        .custom( async idusuario => {
            const user = await usuario.findByPk(idusuario);
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