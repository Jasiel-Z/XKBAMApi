const { articulo, categoria } = require('../models');
const articulocarrito = require('../models/articulocarrito');
const { Op } = require('sequelize');
let self = {}


self.create = async function(req, res){
    try{
        const {id, nombre, desripcion, precio, idcategoria} = req.body;
        const newItem = await articulo.create({
            id: id,
            nombre: nombre,
            desripcion: desripcion,
            precio: precio,
            idcategoria: idcategoria
        })

        return res.status(201).json();
    }catch(error){
        return res.status(500).json({ error: 'Error interno del servidor'});
    }
}

self.update = async function(req, res){
    try{
        const itemId = req.params;
        const body = req.body;

        let item = await articulo.update(body, {where: {id: itemId}});
        if(!item)
            return res.status(404).json({message: 'Artículo no encontrado'});

        return res.status(404).json(item);
    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}


self.delete = async function(req, res){
    try{
        const itemId = req.params.id;
        let item = await articulo.findByPk(itemId);

        if(!item)
            return res.status(404).json({message: 'Artículo no encontrado'});

        item = await cuentabancaria.destroy({where: 
            {id: itemId}
        });

        if(item === 1)
            return res.status(204).json({message: 'Artículo eliminado'});

        return res.status(404).json({message: 'Error al intentar borrar el artículo'});

    }catch(error){
        res.status(500).json({error: 'Error interno del servidor'});
    }

}

self.getAll = async function(req, res){
    try{
        const items = await articulo.findAll();
        if(!items)
            return res.status(404).json({message: 'No se encontraron artículos'});
        
        return res.status(200).json(items);
    }catch (error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}


self.getByCategory = async function(req, res){
    try{
        const categoryId = req.params.idcategoria;
        const items = await articulo.findAll({
            where: { idcategoria: categoryId }
        });

        return res.status(200).json(items);
    }catch(error){
        res.status(500).json({error: 'Error interno del servidor'});
    }
}

self.getByTerm = async function(req, res){
    try{
        const query = req.query.q;
        const items = await articulo.findAll({
            where: {
                [Op.or]: [
                    {nombre: { [Op.like]: `%${query}%` } },
                    { descripcion: { [Op.like]: `%${query}%` } }
                ]
            }
        });

        return res.status(200).json(items);
    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}

module.exports = self;