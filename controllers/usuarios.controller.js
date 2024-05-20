const {usuario, cuenta, rol, Sequelize, sequelize} = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { validationResult } = require('express-validator')


let self = {}

self.createUserAndAccount = async function (req, res){
    const t = await sequelize.transaction();
    try{
        //usar validator
        const errors = validationResult(req);
        if(errors.isEmpty())
          return res.status(400).json({ errors: errors.array() })

        const { nombreusuario, nombre, apellidopaterno, apellidomaterno, genero, contrasena, correo, idrol} = req.body
        console.log(nombreusuario);
        console.log(nombre);
        console.log(apellidopaterno);
        console.log(apellidomaterno);
        console.log(genero)

        const newuser = await usuario.create({
            nombreusuario: nombreusuario,
            nombre: nombre,
            apellidopaterno: apellidopaterno,
            apellidomaterno: apellidomaterno,
            genero: genero
        }, {transaction: t});

        const newaccount = await cuenta.create({
            contrasena: contrasena,
            correo: correo,
            idrol: idrol,
            idusuario: newuser.nombreusuario
        }, {transaction: t});

        await t.commit();
        return res.status(201).json({
            usuario: newuser,
            cuenta: newaccount
        });
    }catch (error){
        await t.rollback();
        return res.status(500).json({ error: error.message});
    }
}

module.exports = self;