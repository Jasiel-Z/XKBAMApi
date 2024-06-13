const router = require('express').Router()
const compras = require('../controllers/compras.controller')
const Authorize = require('../middlewares/autenticacion');


//POST  api/usuarios
router.post('/',Authorize('Cliente,Administrador'), compras.create);


module.exports = router