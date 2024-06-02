const bcrypt = require('bcrypt')
const { cuenta, rol, Sequelize} = require('../models')
const {GeneraToken, TiempoRestanteToken} = require('../services/jwtoken.service')
const usuario = require('../models/usuario')

let self = {}

self.login = async function(req, res){
    try{
        const { correo, contrasena } = req.body; 

        let account = await cuenta.findOne({
            where: {correo: correo},      
        })
    
        let role = await rol.findOne({
            where: { idRol: account.idRol},
        });

        console.log('Información de la cuenta:', account);

        if(!account)
            return res.status(401).json({mensaje: 'Usuario no encontrado o contraseña incorrectos.'});
    
        const passwordMatch = await bcrypt.compare(contrasena, account.contrasena)
        if(!passwordMatch)
            return res.status(401).json({mensaje: 'Usuario o contraseña incorrectos.'});
    
        token = GeneraToken(account.correo, account.usuario, role.nombre)

        return res.status(200).json({
            nombre: account.nombre,        
            correo: account.correo,
            usuario: account.usuario,
            rol: account.idRol,
            jwt: token
        })
    }catch(error){
        return res.status(500).json('Error interno del servidor');
    }
}

self.tiempo = async function(req, res){
    const tiempo = TiempoRestanteToken(req)
    if(tiempo == null)
        return res.status(404).send()
    
    return res.status(200).send(tiempo)
}

module.exports = self