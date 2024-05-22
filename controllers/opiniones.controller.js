const { opinion } = require('../models');
const { validationResult } = require('express-validator');

let self = {}

self.create = async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        const { idproducto, comentario, calificacion, idusuario } =  req.body;
        const newcomment = await comentario.create( {
            idproducto: idproducto,
            comentario: comentario,
            calificacion: calificacion,
            idusuario: idusuario
        });
        return res.status(201).json(newcomment);    
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

module.exports = self;