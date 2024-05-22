const {check, validationResult} = require('express-validator');
const { rol } = require('../models');

const validateUser = [
    check('nombreusuario')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 20 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),
    check('nombre')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),

    check('apellidopaterno')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),

    check('genero')
        .notEmpty().withMessage('Campos vacíos')
        .isInt().withMessage('Tipo de dato no aceptado')
        .toInt(), 

    check('correo')
        .notEmpty().withMessage('Campos vacíos')
        .isEmail().withMessage('El formato del correo no es válido')
        .normalizeEmail(),

    check('contrasena')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 256 }).withMessage('Se ha excedido el máximo de caracteres')
        .trim().escape(),

    check('idrol')
        .isInt().withMessage('Rol no identificado')
        .custom(async (idrol) => {
            const role = await rol.findByPk(idrol);
            if(!role) 
                throw new Error('Rol no encontrado');
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
            return res.status(400).json({ errors: errors.array() });
        
        next();
    }

];

module.exports = { validateUser };
