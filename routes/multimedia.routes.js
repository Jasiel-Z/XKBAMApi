const express = require('express');
const router = express.Router();
const multimediaController = require('../controllers/multimedia.controller');

router.post('/', multimediaController.create);
router.put('/:idMultimedia', multimediaController.update);
router.delete('/:idMultimedia', multimediaController.delete);
router.get('/', multimediaController.getAll);
router.get('/codigo/:codigoArticulo', multimediaController.getByCodigoArticulo);
router.get('/:idMultimedia', multimediaController.getById);

module.exports = router;
