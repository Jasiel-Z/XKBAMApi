const router = require('express').Router()
const direcciones = require('../controllers/direcciones.controller')
const { validateAddress } = require('../validations/addressvalidation');

// Ruta para obtener todas las direcciones de un usuario
router.get('/:usuario', direcciones.getAll);

// Ruta para crear una nueva dirección
router.post('/', validateAddress, direcciones.create);

// Ruta para actualizar una dirección existente
router.put('/:idDireccion', direcciones.update);

// Ruta para eliminar una dirección
router.delete('/:idDireccion', direcciones.delete);

module.exports = router;
