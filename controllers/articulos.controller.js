const { articulo, categoria } = require('../models');
const articulocarrito = require('../models/articulocarrito');
const { Op } = require('sequelize');
let self = {}


self.create = async function(req, res){
    try{
        const { codigoArticulo, nombre, descripcion, precio, idColor, idCategoria } = req.body;
        const newItem = await articulo.create({
            codigoArticulo,
            nombre,
            descripcion,
            precio,
            idColor,
            idCategoria
        });

        return res.status(201).json(newItem);
    } catch(error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.update = async function(req, res){
    try{
        const { codigoArticulo } = req.params;
        const body = req.body;

        let [updated] = await articulo.update(body, { where: { codigoArticulo } });
        if (updated === 0) return res.status(404).json({ message: 'Artículo no encontrado' });

        const updatedItem = await articulo.findByPk(codigoArticulo);
        return res.status(200).json(updatedItem);
    } catch(error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.delete = async function(req, res){
    try{
        const { codigoArticulo } = req.params;
        let item = await articulo.findByPk(codigoArticulo);

        if (!item) return res.status(404).json({ message: 'Artículo no encontrado' });

        await articulo.destroy({ where: { codigoArticulo } });

        return res.status(204).json({ message: 'Artículo eliminado' });
    } catch(error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.getAll = async function(req, res){
    try{
        const items = await articulo.findAll();
        if (!items) return res.status(404).json({ message: 'No se encontraron artículos' });

        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.getByCategory = async function(req, res){
    try{
        const { idCategoria } = req.params;
        const items = await articulo.findAll({ where: { idCategoria } });

        return res.status(200).json(items);
    } catch(error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.getByTerm = async function(req, res){
    try{
        const { q } = req.query;
        const items = await articulo.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: `%${q}%` } },
                    { descripcion: { [Op.like]: `%${q}%` } }
                ]
            }
        });

        return res.status(200).json(items);
    } catch(error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.getById = async function(req, res){
    try{
        const { codigoArticulo } = req.params;
        const item = await articulo.findByPk(codigoArticulo);

        if (!item) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        return res.status(200).json(item);
    } catch(error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = self;
