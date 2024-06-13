const { check, validationResult } = require('express-validator');
const { color, categoria, articulo } = require('../models');

const validateItem = [
    check('codigoArticulo') 
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max:10 }).withMessage("Se ha excedido el máximo de caracteres")
        .trim().escape()
        .custom(async (codigo) => {
            const item = await articulo.findByPk(codigo);
            if(item)
                throw new Error('El código de producto está en uso');
        }),
 
    check('nombre')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de caracteres')
        .trim().escape(),

    check('descripcion')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({max: 300}),

    check('precio')
        .notEmpty().withMessage('Campos vacíos'),


    check('idColor')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .custom(async (colorid) => {
            const col = await color.findByPk(colorid);
            if(!col)
                throw new Error('Color no encontrado');
        }),

    check('idCategoria')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .custom(async (categoriaId) => {
            const category = await categoria.findByPk(categoriaId);
            if(!category)
                throw new Error('Color no encontrado');
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        next();
    }
];


validateItemUpdate = [
    check('codigoArticulo') 
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max:10 }).withMessage("Se ha excedido el máximo de caracteres")
        .trim().escape()
        .custom(async (codigo) => {
            const item = await articulo.findByPk(codigo);
            if(!item)
                throw new Error('La política de la empresa no permite actualizar el código de producto');
        }),

    check('nombre')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de  50 caracteres')
        .trim().escape(),

    check('descripcion')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({max: 300}),

    check('precio')
        .notEmpty().withMessage('Campos vacíos'),


    check('idColor')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .custom(async (colorid) => {
            const col = await color.findByPk(colorid);
            if(!col)
                throw new Error('Color no encontrado');
        }),

    check('idCategoria')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .custom(async (categoriaId) => {
            const category = await categoria.findByPk(categoriaId);
            if(!category)
                throw new Error('Color no encontrado');
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        next();
    }
];

module.exports = { validateItem, validateItemUpdate };