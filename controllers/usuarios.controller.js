const {usuario, cuenta, carrito ,rol, Sequelize, sequelize} = require('../models')
const bcrypt = require('bcrypt')
const { error } = require('console')
const crypto = require('crypto')
const { validationResult } = require('express-validator')


let self = {}

self.create = async function (req, res){
    const t = await sequelize.transaction();
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Solicitud no válida',
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const { usuario: userData, cuenta: accountData } = req.body;
        const { nombreusuario, nombre, apellidopaterno, apellidomaterno, genero } = userData;
        const { contrasena, correo, idrol } = accountData;

        const newUser = await usuario.create({
            nombreusuario: nombreusuario,
            nombre: nombre,
            apellidopaterno: apellidopaterno,
            apellidomaterno: apellidomaterno,
            genero: genero
        }, {transaction: t});

        const newAccount = await cuenta.create({
            contrasena: contrasena,
            correo: correo,
            idrol: idrol,
            idusuario: newUser.nombreusuario
        }, {transaction: t});

        const newShopCart = await carrito.create({
            idusuario: newUser.nombreusuario
        }, {transaction: t});

        await t.commit();
        return res.status(201).json({
            usuario: newUser,
            cuenta: newAccount,
            carrito: newShopCart
        });

    }catch (error){
        await t.rollback();
        return res.status(500).json({ error: error.message});
    }
}

self.update = async function (req, res){
    try{
        
    }catch(error){
        return res.status(500).json({error: error.message});
    }

}

module.exports = self;