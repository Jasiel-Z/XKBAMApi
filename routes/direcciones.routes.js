const router = require('express').Router()
const direcciones = require('../controllers/direcciones.controller')
const Authorize = require('../middlewares/autenticacion');
const { validateAddress } = require('../validations/addressvalidation');


router.get('/:usuario', Authorize('Cliente'),direcciones.getAll);

router.post('/', Authorize('Cliente'),validateAddress,direcciones.create);

router.put('/:idDireccion', Authorize('Cliente'),direcciones.update);

router.delete('/:idDireccion', Authorize('Cliente'),direcciones.delete);


module.exports = router;