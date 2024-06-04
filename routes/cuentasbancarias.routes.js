const router = require('express').Router()
const cuentasbancarias = require('../controllers/cuentasbancarias.controller')
const { validateAccount } = require('../validations/accountvalidation');
const Authorize = require('../middlewares/autenticacion');


router.get('/:usuario',cuentasbancarias.getAll);

router.post('/',validateAccount,cuentasbancarias.create);

router.put('/:numeroTarjeta',cuentasbancarias.update);

router.delete('/:numeroTarjeta',cuentasbancarias.delete);

module.exports = router;