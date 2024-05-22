const {check, validateResult} = require('express-validator');
const {articulo, usuario, talla, color} =  require('../models');

const validatePurchase = [
    check('idusuario')
        .notEmpty().withMessage('Campo vacío')
        .isString().withMessage('Tipo de dato no aceptado')
        .trim().escape()
        .custom(async (idusuario) => {
            const user = await usuario.findByPk(idusuario);
            if (!user) {
                return Promise.reject('Usuario no encontrado');
            }
        }),

    check('estado')
        .notEmpty().withMessage('Campo vacío')
        .isString().withMessage('Tipo de dato no aceptado')
        .trim().escape(),

    check('articulos').isArray().withMessage('Se espera una lista de artículos'),

    check('articulos.*.idarticulo')
        .notEmpty().withMessage('Campo vacío')
        .isString().withMessage('Tipo de dato no aceptado')
        .trim()
        .custom(async (idarticulo) => {
            const item = await articulo.findByPk(idarticulo);
            if (!item) {
                return Promise.reject('Artículo no encontrado');
            }
        }),

    check('articulos.*.cantidadarticulo')
        .notEmpty().withMessage('Campo vacío')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt(),

    check('articulos.*.preciounitario')
        .notEmpty().withMessage('Campo vacío')
        .isFloat().withMessage('Tipo de dato no aceptado')
        .toFloat(),

    check('articulos.*.preciofinal')
        .notEmpty().withMessage('Campo vacío')
        .isFloat().withMessage('Tipo de dato no aceptado')
        .toFloat(),

    check('articulos.*.idtalla')
        .notEmpty().withMessage('Campo vacío')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt()
        .custom(async (idtalla) => {
            const size = await talla.findByPk(idtalla);
            if (!size) {
                return Promise.reject('Talla no encontrada');
            }
        }),

    check('articulos.*.idcolor')
        .notEmpty().withMessage('Campo vacío')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt()
        .custom(async (idcolor) => {
            const color = await color.findByPk(idcolor);
            if (!color) {
                return Promise.reject('Color no encontrado');
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
