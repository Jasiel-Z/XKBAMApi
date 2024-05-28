const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET
const {GeneraToken} = require('../services/jwtoken.service');
const ClaimTypes = require('../config/claimtypes');

const Authorize = (rol) => {
    return async (req, res, next) => {
        try{
            const authHeader = req.header('Authorization')
            if(!authHeader.startsWith('Bearer '))
                return res.status(401).json({ message: 'Token de autorización no válido'});

            const token = authHeader.split(' ')[1]
            const decodedToken = jwt.verify(token, jwtSecret)

            if(rol.split(',').indexOf(decodedToken[ClaimTypes.Role] == -1))
                return res.status(401).json({message:'No cuentas con los permisos para realizar la solicitud'});

            req.decodedToken = jwt.decodedToken

            var minutosRestantes = (decodedToken.exp - (new Date().getTime() / 1000)) / 60;

            if(minutosRestantes < 5){
                var nuevoToken = GeneraToken(decodedToken[ClaimTypes.Name], 
                    decodedToken[ClaimTypes.GivenName], decodedToken[ClaimTypes.Role])
                res.header("Set-Authorization", nuevoToken)
            }

            next()

        }catch(error){
            return res.status(401).json(error);
        }
    }
}


module.exports = Authorize