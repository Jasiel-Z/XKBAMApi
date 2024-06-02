const {check, validationResult, checkSchema} = require('express-validator');
const { carrito, articulo } = require('../models');

const validateItemToAdd = [
    check('codigoArticulo')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 20 }).withMessage('El código del artículo no puede tener más de 20 caracteres')
        .trim().escape()
        .custom(async (codigoArticulo) => {
            const item = await articulo.findByPk(codigoArticulo);
            if (!item) {
                return Promise.reject('Artículo no encontrado');
            }
        }),

    check('cantidadArticulo')
        .notEmpty().withMessage('Campos vacíos')
        .isInt({ min: 1, max: 10 }).withMessage('La cantidad debe ser un número entre 1 y 10')
        .toInt(),

    check('idTalla')
        .notEmpty().withMessage('Campos vacíos')
        .isInt({ min: 1, max: 5 }).withMessage('El id de la talla debe ser un número entre 1 y 5')
        .toInt(),

    check('idCarrito')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('El id del carrito debe ser un número entero')
        .custom(async (idCarrito) => {
            const cart = await carrito.findByPk(idCarrito);
            if (!cart) {
                return Promise.reject('Carrito no encontrado');
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


module.exports = { validateItemToAdd };
