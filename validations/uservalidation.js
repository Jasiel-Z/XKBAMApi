const {check, validationResult} = require('express-validator');

const validateUser = [
    check('nombreusuario')
        .isLength({ min: 8 })
        .withMessage('El nombre de usuario debe contener al menos 8 caracteres')
        .trim()
        .escape(),
    check('nombre')
        .not().isEmpty()
        .withMessage('Campos faltantes')
        .trim()
        .escape(),
    check('apellidopaterno')
        .not().isEmpty()
        .withMessage('Campos faltantes')
        .trim()
        .escape(),
    check('genero')
        .isInt()
        .withMessage('Campos faltantes')
        .toInt(),
    check('correo')
        .isEmail()
        .withMessage('El formato del correo no es válida')
        .normalizeEmail(),
    check('contrasena')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .trim()
        .escape(),
    check('idrol')
        .isInt()
        .withMessage('Rol no identificado')
        .custom(async (idrol) => {
            const role = await role.findByPk(idrol);
            if(!role) 
                throw new Error('Rol no identificado');
            
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

];

module.exports = { validateUser }
