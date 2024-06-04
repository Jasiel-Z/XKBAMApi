const { opinion } = require('../models');
const { validationResult } = require('express-validator');

let self = {}

self.create = async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        const { codigoArticulo, comentario, calificacion, usuario } =  req.body;
        const newcomment = await opinion.create( {
            codigoArticulo: codigoArticulo,
            comentario: comentario,
            calificacion: calificacion,
            usuario: usuario
        });
        return res.status(201).json(newcomment);    
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

self.getOpinionsByArticleCode = async function(req, res) {
    try {
        const { codigoArticulo } = req.params;

        const opinions = await opinion.findAll({
            where: { codigoArticulo: codigoArticulo }
        });

        return res.status(200).json(opinions);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = self;