const router = require('express').Router()
const usuarios = require('../controllers/usuarios.controller')
const { validateUser } = require('../validations/uservalidation');

//POST  api/usuarios
router.post('/', validateUser, usuarios.createUserAndAccount)

module.exports = router