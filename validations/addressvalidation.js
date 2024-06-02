const {check, validationResult} = require('express-validator');
const { usuario } = require('../models');

const validateAddress = [
    check('estado')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),

    check('municipio')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),
    
    check('codigoPostal')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 8 caracteres')
        .trim().escape(),
    
    check('calle')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),
    
    check('numeroExterno')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt(), 

    check('usuario')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')        
        .custom(async (usuarioid) => {
            const user = await usuario.findByPk(usuarioid);
            if(!user)
                throw new Error('Usuario no encontrado');
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
            return res.status(400).json({ errors: errors.array() });
            
        next();
    }

];

module.exports = { validateAddress }
