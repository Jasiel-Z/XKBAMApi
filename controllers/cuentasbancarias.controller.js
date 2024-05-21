const { cuenta, usuario, Sequelize } = require('../models');
const { validationResult } = require('express-validator');

let self = {}

self.create = async function (req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array() });  

        const {numerocuenta, titular, idusuario} = req.body;
        const newaccount = await cuentabancaria.create({
            numerocuenta: numerocuenta,
            titular: titular,
            idusuario: idusuario
        });
        return res.status(201).json(newaccount);
    }catch (error){
        return res.status(500).json({error: error.message});
    }
}

self.update = async function(req,res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: array()});

        const accountnumber = req.params.id;
        const body = req.body;
        
        let useraccount = await cuentabancaria.update(body, {where: {numerocuenta: accountnumber}});
        
        if(!useraccount)
            return res.status(404).json({message: 'Cuenta bancaria no encontrada'});

        return res.status(204).json(useraccount)

    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

self.delete = async function(req, res){
    try{
        const accountnumber = req.params.id;
        let useraccount = await cuentabancaria.findByPk(accountnumber);

        if(!useraccount)
            return res.status(404).json({message: 'Cuenta bancaria no encontrada'})

        useraccount = await cuentabancaria.destroy({where: 
            {id: useraccount}
        });

        if(useraccount === 1)
            return res.status(204).json({message: 'Cuenta bancaria eliminada'});

        return res.status(404).json({message: 'Error al intentar borrar la cuenta bancaria'});

    }catch(error){
        res.status(500).json({error: error.message });
    }
}

self.getAll = async function(req, res){
    try{
        const userid = req.params.idusuario;
        const accounts = await cuentabancaria.findAll({
            where: { idusuario: userid }
        });
        if(!accounts)
            return res.status(404).json({message: 'No se encontraron direcciones para este usuario'});
        
        return res.status(200).json(accounts);
    }catch (error){
        return res.status(500).json({error: error.message});
    }
}

module.exports = self;