const {check, validationResult} = require('express-validator');
const { rol, genero, cuenta, usuario } = require('../models');

const validateUser = [
    check('usuario.nombreusuario')
        .notEmpty().withMessage('Campo obligatorio')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ min: 6,max: 20 }).withMessage('El usuario debe tener de 6 a 30 caracteres')
        .trim().escape()
        .custom(async (nombreusuario) => {
            const user = await usuario.findOne({where: {nombreusuario}});
            if(user)
                throw new Error('El nombre de usuario se encuentra en uso');
        }),

    check('usuario.nombre')
        .notEmpty().withMessage('Campo obligatorio')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),

    check('usuario.apellidopaterno')
        .notEmpty().withMessage('Campo obligatorio')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 50 }).withMessage('Se ha excedido el máximo de 30 caracteres')
        .trim().escape(),

    check('usuario.genero')
        .notEmpty().withMessage("Campo obligatorio ")
        .isInt().withMessage('Tipo de dato no aceptado')
        .isIn([1, 2]).withMessage('El valor debe ser 1 o 2'), 

    check('cuenta.correo')
        .notEmpty().withMessage('Campo obligatorio')
        .isEmail().withMessage('El formato del correo no es válido')
        .isLength({max: 50}).withMessage('El correo no puede contener más de 50 caracteres')
        .normalizeEmail()
        .custom(async (correo) => {
            const account = await cuenta.findOne({where: {correo}});
            if(account)
                throw new Error('El correo se encuentra en uso');
        }),

    check('cuenta.contrasena')
        .notEmpty().withMessage('Campo obligatorio')
        .isString().withMessage('Tipo de dato no aceptado')
        .isLength({ max: 256 }).withMessage('Se ha excedido el máximo de caracteres')
        .trim().escape(),

    check('cuenta.idrol')
        .notEmpty().withMessage("Campo obligatorio ")
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
