const router = require('express').Router()
const opiniones = require('../controllers/opiniones.controller')
const Authorize = require('../middlewares/autenticacion');


//POST  api/usuarios
router.post('/',opiniones.create)

router.get('/:codigoArticulo',Authorize('Cliente,Administrador'), opiniones.getOpinionsByArticleCode);


module.exports = router