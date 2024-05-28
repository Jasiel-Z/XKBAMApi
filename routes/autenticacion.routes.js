const router = require('express').Router()
const auth = require('../controllers/autenticacion.controller')

router.post('/', auth.login)

router.get('/tiempo', auth.tiempo)

module.exports = router