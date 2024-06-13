const router = require('express').Router()
const direcciones = require('../controllers/direcciones.controller')
const { validateAddress } = require('../validations/addressvalidation');
const Authorize = require('../middlewares/autenticacion');

// Ruta para obtener todas las direcciones de un usuario
router.get('/:usuario', Authorize('Cliente'),direcciones.getAll);

// Ruta para crear una nueva dirección
router.post('/', Authorize('Cliente'),validateAddress, direcciones.create);

// Ruta para actualizar una dirección existente
router.put('/:idDireccion', Authorize('Cliente'),direcciones.update);

// Ruta para eliminar una dirección
router.delete('/:idDireccion',  Authorize('Cliente'),direcciones.delete);

module.exports = router;
