const { usuario, cuenta, carrito, rol, Sequelize, sequelize } = require('../models');
const bcrypt = require('bcrypt')
const { error } = require('console')
const crypto = require('crypto')
const { validationResult } = require('express-validator')


let self = {}

self.create = async function (req, res){
    const t = await sequelize.transaction();
    try{

        const { usuario: userData, cuenta: accountData } = req.body;
        const { usuario: userName, nombre, apellidoPaterno, apellidoMaterno, genero } = userData;
        const { contrasena, correo, idRol } = accountData;

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const newUser = await usuario.create({
            usuario: userName,
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            genero: genero
        }, { transaction: t });

        const newAccount = await cuenta.create({
            contrasena: hashedPassword,
            correo: correo,
            idRol: idRol,
            usuario: newUser.usuario
        }, { transaction: t });

        const newShopCart = await carrito.create({
            usuario: newUser.usuario
        }, { transaction: t });


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