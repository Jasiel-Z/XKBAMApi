const router = require('express').Router();
const articulos = require('../controllers/articulos.controller');
const Authorize = require('../middlewares/autenticacion');

// Crear un nuevo artículo
router.post('/', articulos.create);

// Actualizar un artículo por su código
router.put('/:codigoArticulo', articulos.update);

// Eliminar un artículo por su código
router.delete('/:codigoArticulo', articulos.delete);

// Obtener todos los artículos
router.get('/',Authorize('Cliente,Administrador'), articulos.getAll);

// Obtener artículos por categoría
router.get('/categoria/:idCategoria',Authorize('Cliente,Administrador'), articulos.getByCategory);

// Buscar artículos por término en nombre o descripción
router.get('/search/:termino',Authorize('Cliente,Administrador'), articulos.getByTerm);

// Obtener un artículo por su código
router.get('/:codigoArticulo',Authorize('Cliente,Administrador'), articulos.getById);

module.exports = router;
