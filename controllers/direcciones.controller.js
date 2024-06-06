const { AccessDeniedError } = require('sequelize');
const { direccion } = require('../models');
const { validationResult } = require('express-validator');

let self = {}

self.create = async function (req,res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        const {estado, municipio, codigoPostal, calle, numeroExterno, usuario} = req.body;
        const newaddress = await direccion.create({
            estado,
            municipio,
            codigoPostal,
            calle,
            numeroExterno,
            usuario
        });
        return res.status(201).json(newaddress);
    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}

self.update = async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        //const userid = req.params.idusuario;
        const addressid = req.params.idDireccion;
        const body = req.body;
        let useraddress = await direccion.update(body, {where:{idDireccion: addressid}});
        
        if(!useraddress)
            return res.status(404).json({message:'Dirección no encontrada'});

        return res.status(204).json(useraddress);
    }catch(error){
        res.status(500).json({error: 'Error interno del servidor'});
    }
}

// Direcciones de usuario
self.getAll = async function(req, res){
    try{
        const userid = req.params.usuario;
        const addresses = await direccion.findAll({
            where: { usuario: userid }
        });
        if(!addresses)
            return res.status(404).json({message: 'No se encontraron direcciones para este usuario'});
        
        return res.status(200).json(addresses);
    }catch (error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}

self.delete = async function(req, res){
    try{
        const addressid = req.params.idDireccion;
        let useraddress = await direccion.findByPk(addressid);
        if(!useraddress)
            return res.status(404).json({message: 'Dirección no encontrada'});
        
        useraddress = await direccion.destroy({where:
            {idDireccion: addressid}
        });

        if(useraddress === 1)
            return res.status(204).json({message: 'Dirección eliminada'});
        else
            return res.status(404).json({message: 'Error al intentar borrar la dirección'});

    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }


}
module.exports = self;