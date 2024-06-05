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


self.updateUserAndAccount = async function (req, res) {
    const t = await sequelize.transaction();
    try {
        const { usuario: userName } = req.params;
        const { usuario: userData, cuenta: accountData } = req.body;
        const { nombre, apellidoPaterno, apellidoMaterno, genero } = userData;
        const { contrasena, correo, idRol } = accountData;

        // Buscar el usuario y la cuenta en la base de datos
        const user = await usuario.findOne({ where: { usuario: userName }, transaction: t });
        const account = await cuenta.findOne({ where: { usuario: userName }, transaction: t });

        if (!user || !account) {
            await t.rollback();
            return res.status(404).json({ message: 'Usuario o cuenta no encontrados' });
        }

        // Actualizar los datos del usuario
        await user.update({
            nombre: nombre || user.nombre,
            apellidoPaterno: apellidoPaterno || user.apellidoPaterno,
            apellidoMaterno: apellidoMaterno || user.apellidoMaterno,
            genero: genero || user.genero
        }, { transaction: t });

        // Actualizar los datos de la cuenta
        let hashedPassword = account.contrasena;
        if (contrasena) {
            hashedPassword = await bcrypt.hash(contrasena, 10);
        }

        await account.update({
            correo: correo || account.correo,
            contrasena: hashedPassword,
            idRol: idRol || account.idRol
        }, { transaction: t });

        await t.commit();
        return res.status(200).json({
            usuario: user,
            cuenta: account
        });

    } catch (error) {
        await t.rollback();
        return res.status(500).json({ error: error.message });
    }
}


self.getUserAndAccount = async function(req, res) {
    try {
        const {usuario: userName }= req.params;

        const user = await usuario.findOne({
            where: { usuario: userName },
            //include: [{ model: cuenta, as: 'cuenta' }]
        });

        const account =  await cuenta.findOne({
            where: { usuario: userName}
        });

        if (!user || !account) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ usuario: user , cuenta: account});
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}


module.exports = self;