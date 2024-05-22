const router = require('express').Router()
const categorias = require('../controllers/categorias.controller')


//POST  api/usuarios
router.get('/', categorias.getAll)


module.exports = router