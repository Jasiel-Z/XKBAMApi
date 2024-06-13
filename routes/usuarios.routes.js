const router = require('express').Router();
const Joi = require('joi');
const usuarios = require('../controllers/usuarios.controller');
const  { validateUser } = require('../validations/uservalidation');
const joiValidation  = require('../middlewares/validationmidleware');
const validationErrorHandler = require('../middlewares/validationerrorhandler');
const userSchema = require('../schemas/userschema');
const { updateUserSchema } = require('../schemas/userschema');
const accountSchema = require('../schemas/accountschema');

const combinedSchema = Joi.object({
    usuario: userSchema,
    cuenta: accountSchema
});


//POST  api/usuarios
router.post('/',validateUser, usuarios.create)
//router.use(validationErrorHandler);
router.get('/:usuario',usuarios.getUserAndAccount)
router.put('/:usuario', usuarios.updateUserAndAccount);

router.get('/:usuario',usuarios.getUserAndAccount)

router.get('/:usuario',usuarios.getUserAndAccount)

module.exports = router;