const { multimedia } = require('../models');
const { Op } = require('sequelize');
let self = {};

self.create = async function(req, res) {
    try {
        const { nombre, contenido, codigoArticulo } = req.body;
        const newMultimedia = await multimedia.create({
            nombre,
            contenido,
            codigoArticulo
        });

        return res.status(201).json(newMultimedia);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.update = async function(req, res) {
    try {
        const { idMultimedia } = req.params;
        const body = req.body;

        let [updated] = await multimedia.update(body, { where: { idMultimedia } });
        if (updated === 0) return res.status(404).json({ message: 'Multimedia no encontrada' });

        const updatedMultimedia = await multimedia.findByPk(idMultimedia);
        return res.status(200).json(updatedMultimedia);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.delete = async function(req, res) {
    try {
        const { idMultimedia } = req.params;
        let item = await multimedia.findByPk(idMultimedia);

        if (!item) return res.status(404).json({ message: 'Multimedia no encontrada' });

        await multimedia.destroy({ where: { idMultimedia } });

        return res.status(204).json({ message: 'Multimedia eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.getAll = async function(req, res) {
    try {
        const items = await multimedia.findAll();
        if (!items) return res.status(404).json({ message: 'No se encontró multimedia' });

        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.getByCodigoArticulo = async function(req, res) {
    try {
        const { codigoArticulo } = req.params;
        const item = await multimedia.findAll({ where: { codigoArticulo } });

        return res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

self.getById = async function(req, res) {
    try {
        const { idMultimedia } = req.params;
        const item = await multimedia.findByPk(idMultimedia);

        if (!item) {
            return res.status(404).json({ message: 'Multimedia no encontrada' });
        }

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = self;
