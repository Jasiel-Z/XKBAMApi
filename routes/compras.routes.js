const router = require('express').Router()
const compras = require('../controllers/compras.controller')
const Authorize = require('../middlewares/autenticacion');


//POST  api/usuarios
router.post('/', compras.create);


module.exports = router