const router = require('express').Router();
const articulos = require('../controllers/articulos.controller');

// Crear un nuevo artículo
router.post('/', articulos.create);

// Actualizar un artículo por su código
router.put('/:codigoArticulo', articulos.update);

// Eliminar un artículo por su código
router.delete('/:codigoArticulo', articulos.delete);

// Obtener todos los artículos
router.get('/', articulos.getAll);

// Obtener artículos por categoría
router.get('/categoria/:idCategoria', articulos.getByCategory);

// Buscar artículos por término en nombre o descripción
router.get('/search', articulos.getByTerm);

// Obtener un artículo por su código
router.get('/:codigoArticulo', articulos.getById);

module.exports = router;
