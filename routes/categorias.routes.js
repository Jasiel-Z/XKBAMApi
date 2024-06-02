const router = require('express').Router()
const categorias = require('../controllers/categorias.controller')
const Authorize = require('../middlewares/autenticacion');


//POST  api/usuarios
router.get('/', Authorize('Cliente,Administrador'),categorias.getAll)


module.exports = router