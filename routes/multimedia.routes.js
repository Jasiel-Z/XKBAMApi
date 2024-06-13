const express = require('express');
const router = express.Router();
const multimediaController = require('../controllers/multimedia.controller');
const Authorize = require('../middlewares/autenticacion');

router.post('/', multimediaController.create);
router.put('/:idMultimedia', multimediaController.update);
router.delete('/:idMultimedia', multimediaController.delete);
router.get('/', multimediaController.getAll);
router.get('/codigo/:codigoArticulo',Authorize('Cliente,Administrador'), multimediaController.getByCodigoArticulo);
router.get('/:idMultimedia',Authorize('Cliente,Administrador'), multimediaController.getById);

module.exports = router;
