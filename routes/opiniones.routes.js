const router = require('express').Router()
const opiniones = require('../controllers/opiniones.controller')
const Authorize = require('../middlewares/autenticacion');


//POST  api/usuarios
router.post('/', Authorize('Cliente'),opiniones.create)


module.exports = router