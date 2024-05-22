const router = require('express').Router()
const direcciones = require('../controllers/direcciones.controller')

router.get('/:idusuario', direcciones.getAll);

router.post('/', direcciones.create);

router.put('/:id', direcciones.update);

router.delete('/:id', direcciones.delete);


module.exports = router;