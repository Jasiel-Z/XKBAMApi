const {check, validationResult, checkSchema} = require('express-validator');
const { articulo } = require('../models');

const validateItemToAdd = [
    check('iarticulo')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 20 }).withMessage('El id del artículo no puede tener más de 20 caracteres')
        .trim.escape()
        .custom( async (idarticulo) => {
            const item = await articulo.findByPk(idarticulo);
            if(!item)
                return Promise.reject('Artículo no encontrado');      
        }),

    check('cantidadarticulo')
        .notEmpty().withMessage('Campos vacíos')
        .isInt({ min: 1, max: 10 }).withMessage('La cantidad debe ser un número entre 1 y 10')
        .toInt(),

    (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) 
                return res.status(400).json({ errors: errors.array() });
            
            next();
        }
    
]; 


const validateItemToRemove = [
    check('id')
];


module.exports = { validateItem };
