const router = require('express').Router()
const compras = require('../controllers/compras.controller')
const Authorize = require('../middlewares/autenticacion');
const { validatePurchase } = require('../validations/purchasevalidation')

//POST  api/usuarios
router.post('/', Authorize('Cliente'), compras.create)


module.exports = router