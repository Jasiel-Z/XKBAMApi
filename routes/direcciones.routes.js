const router = require('express').Router()
const direcciones = require('../controllers/direcciones.controller')
const Authorize = require('../middlewares/autenticacion');

router.get('/:usuario', Authorize('Cliente'),direcciones.getAll);

router.post('/', Authorize('Cliente'),direcciones.create);

router.put('/:idDireccion', Authorize('Cliente'),direcciones.update);

router.delete('/:idDireccion', Authorize('Cliente'),direcciones.delete);


module.exports = router;