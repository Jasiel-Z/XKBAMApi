const router = require('express').Router()
const tallas = require('../controllers/tallas.controller')


//POST  api/usuarios
router.get('/', tallas.getAll)


module.exports = router