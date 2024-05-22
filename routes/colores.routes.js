const router = require('express').Router()
const colores = require('../controllers/colores.controller')


//POST  api/usuarios
router.get('/', colores.getAll)


module.exports = router