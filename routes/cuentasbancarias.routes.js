const router = require('express').Router()
const cuentasbancarias = require('../controllers/cuentasbancarias.controller')
const { validateAccount } = require('../validations/accountvalidation');
const Authorize = require('../middlewares/autenticacion');


router.get('/:usuario', Authorize('Cliente'),cuentasbancarias.getAll);

router.post('/', Authorize('Cliente'),validateAccount,cuentasbancarias.create);

router.put('/:numeroTarjeta', Authorize('Cliente'),cuentasbancarias.update);

router.delete('/:numeroTarjeta', Authorize('Cliente'),cuentasbancarias.delete);

module.exports = router;