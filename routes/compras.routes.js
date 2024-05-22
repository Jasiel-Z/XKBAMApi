const router = require('express').Router()
const compras = require('../controllers/compras.controller')


//POST  api/usuarios
router.post('/', compras.create)


module.exports = router