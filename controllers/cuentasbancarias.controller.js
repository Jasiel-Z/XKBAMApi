const { tarjetabancaria, usuario, Sequelize } = require('../models');
const { validationResult } = require('express-validator');
const { tarjetabancaria } = require('../models');


let self = {}

self.create = async function (req, res){
    try{
        

        const {numeroTarjeta, titular, fechaExpiracion, cvv, usuario} = req.body;
        const newaccount = await tarjetabancaria.create({
            numeroTarjeta: numeroTarjeta,
            titular: titular,
            fechaExpiracion: fechaExpiracion,
            cvv: cvv,
            usuario: usuario
        });
        return res.status(201).json(newaccount);
    }catch (error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}

self.update = async function(req,res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: array()});

        const accountnumber = req.params.numeroTarjeta;
        const body = req.body;
        
        let useraccount = await tarjetabancaria.update(body, {where: {numeroTarjeta: accountnumber}});
        
        if(!useraccount)
            return res.status(404).json({message: 'Cuenta bancaria no encontrada'});

        return res.status(204).json(useraccount)

    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}

self.delete = async function(req, res){
    try{
        const accountnumber = req.params.numeroTarjeta;
        let useraccount = await tarjetabancaria.findByPk(accountnumber);

        if(!useraccount)
            return res.status(404).json({message: 'Cuenta bancaria no encontrada'})

        useraccount = await tarjetabancaria.destroy({where: 
            {numeroTarjeta: accountnumber}
        });

        if(useraccount === 1)
            return res.status(204).json({message: 'Cuenta bancaria eliminada'});

        return res.status(404).json({message: 'Error al intentar borrar la cuenta bancaria'});

    }catch(error){
        res.status(500).json({error: 'Error interno del servidor' });
    }
}

self.getAll = async function(req, res){
    try{
        const userid = req.params.usuario;
        const accounts = await tarjetabancaria.findAll({
            where: { usuario: userid }
        });
        if(!accounts)
            return res.status(404).json({message: 'No se encontraron direcciones para este usuario'});
        
        return res.status(200).json(accounts);
    }catch (error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}

module.exports = self;