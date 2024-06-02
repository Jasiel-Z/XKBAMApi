const router = require('express').Router()
const colores = require('../controllers/colores.controller')
const Authorize = require('../middlewares/autenticacion');


//POST  api/usuarios
router.get('/', Authorize('Cliente,Administrador'),colores.getAll)


module.exports = router