const router = require('express').Router()
const cuentasbancarias = require('../controllers/cuentasbancarias.controller')
const { validateAccount } = require('../validations/accountvalidation');



router.get('/:idusuario', cuentasbancarias.getAll);

router.post('/', validateAccount,cuentasbancarias.create);

router.put('/:id', cuentasbancarias.update);

router.delete('/:id', cuentasbancarias.delete);

module.exports = router;