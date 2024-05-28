const router = require('express').Router()
const direcciones = require('../controllers/direcciones.controller')
const Authorize = require('../middlewares/autenticacion');

router.get('/:idusuario', Authorize('Cliente'),direcciones.getAll);

router.post('/', Authorize('Cliente'),direcciones.create);

router.put('/:id', Authorize('Cliente'),direcciones.update);

router.delete('/:id', Authorize('Cliente'),direcciones.delete);


module.exports = router;