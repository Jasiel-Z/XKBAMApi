const {check, validationResult} = require('express-validator');
const { rol, genero } = require('../models');

const validateUser = [
    check('usuario.nombreusuario')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ min: 6,max: 20 }).withMessage('El usuario debe tener de 6 a 30 caracteres')
        .trim().escape(),
    check('usuario.nombre')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),

    check('usuario.apellidopaterno')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),

    check('usuario.genero')
        .isInt().withMessage('Tipo de dato no aceptado'), 

    check('cuenta.correo')
        .notEmpty().withMessage('Campos vacíos')
        .isEmail().withMessage('El formato del correo no es válido')
        .isLength({max: 50}).withMessage('El correo no puede contener más de 50 caracteres')
        .normalizeEmail(),

    check('cuenta.contrasena')
        .notEmpty().withMessage('Campos vacíos')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 256 }).withMessage('Se ha excedido el máximo de caracteres')
        .trim().escape(),

    check('cuenta.idrol')
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
