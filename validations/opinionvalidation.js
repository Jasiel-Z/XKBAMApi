const {check, validationResult} = require('express-validator');
const {articulo, usuario} = require ('../models')

const validateOpinion = [
    check('codigoArticulo')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt()
        .custom( async (codigoArticulo) => {
            const item = await articulo.findByPk(codigoArticulo);
            if(!item)
                return Promise.reject('Artículo no encontrado');      
        }),

    check('comentario')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 500 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),

    check('calificacion')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt(), 
    
    check('usuario')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt()
        .custom( async (usuario) => {
            const user = await usuario.findByPk(usuario);
            if(!user)
                return Promise.reject('Usuario no encontrado');      
        }),
    
    (req, res, next) => {
        const errors = validateOpinion(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});   
        next();
    }
    
];

module.exports = { validateOpinion }