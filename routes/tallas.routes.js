const router = require('express').Router()
const tallas = require('../controllers/tallas.controller')
const Authorize = require('../middlewares/autenticacion');


//POST  api/usuarios
router.get('/', Authorize('Cliente,Administrador'), tallas.getAll)


module.exports = router