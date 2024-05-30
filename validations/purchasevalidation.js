const {check, validateResult} = require('express-validator');
const {articulo, usuario, talla, color} =  require('../models');

const validatePurchase = [
    check('usuario')
        .notEmpty().withMessage('Campo vacío')
        .isString().withMessage('Tipo de dato no aceptado')
        .trim().escape()
        .custom(async (usuario) => {
            const user = await usuario.findByPk(usuario);
            if (!user) {
                return Promise.reject('Usuario no encontrado');
            }
        }),

    check('estado')
        .notEmpty().withMessage('Campo vacío')
        .isString().withMessage('Tipo de dato no aceptado')
        .trim().escape(),

    check('articulos').isArray().withMessage('Se espera una lista de artículos'),

    check('articulos.*.codigoArticulo')
        .notEmpty().withMessage('Campo vacío')
        .isString().withMessage('Tipo de dato no aceptado')
        .trim()
        .custom(async (codigoArticulo) => {
            const item = await articulo.findByPk(codigoArticulo);
            if (!item) {
                return Promise.reject('Artículo no encontrado');
            }
        }),

    check('articulos.*.cantidadArticulo')
        .notEmpty().withMessage('Campo vacío')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt(),

    check('articulos.*.precioUnitario')
        .notEmpty().withMessage('Campo vacío')
        .isFloat().withMessage('Tipo de dato no aceptado')
        .toFloat(),

    check('articulos.*.precioFinal')
        .notEmpty().withMessage('Campo vacío')
        .isFloat().withMessage('Tipo de dato no aceptado')
        .toFloat(),

    check('articulos.*.idTalla')
        .notEmpty().withMessage('Campo vacío')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt()
        .custom(async (idTalla) => {
            const size = await talla.findByPk(idTalla);
            if (!size) {
                return Promise.reject('Talla no encontrada');
            }
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validatePurchase };
