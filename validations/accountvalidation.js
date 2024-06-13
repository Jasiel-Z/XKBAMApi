const { validationResult, check } = require('express-validator');
const { usuario } = require('../models');

const validateAccount = [
    check('numeroTarjeta')
        .notEmpty().withMessage('Campos vacíos')
        .isCreditCard().withMessage('Número de tarjeta inválido'),

    check('titular')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 255 }).withMessage('Se ha excedido el máximo de caracteres')
        .trim().escape(),

        check('fechaExpiracion')
        .notEmpty().withMessage('Campos vacíos')
        .isDate().withMessage('Tipo de dato no aceptado')
        .custom((fechaExpiracion) => {
            const hoy = new Date();
            const fecha = new Date(fechaExpiracion);
            if (fecha < hoy)
                return Promise.reject('La tarjeta ya ha expirado');

            return true;
        }),


    check('usuario')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isString().withMessage('Tipo de dato no aceptado')
        .custom(async (usuarioid) => {
            const user = await usuario.findByPk(usuarioid);
            if (!user)
            if (!user)
                throw new Error('Usuario no encontrado');
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        next();
    }
];


module.exports = { validateAccount };