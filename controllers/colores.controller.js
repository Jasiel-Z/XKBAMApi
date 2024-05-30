const {color,Sequelize, sequelize} = require('../models')
const { error } = require('console')
const { validationResult } = require('express-validator')

let self = {}

self.getAll = async function(req,res){
    try{
        const  colores = await color.findAll({ attributes: [
            ['idColor', 'idColor'],
            'nombre'
        ]});
        return res.status(200).json(colores);
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}


module.exports = self;