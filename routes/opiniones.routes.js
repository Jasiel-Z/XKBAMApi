const router = require('express').Router()
const opiniones = require('../controllers/opiniones.controller')


//POST  api/usuarios
router.post('/', opiniones.create)


module.exports = router