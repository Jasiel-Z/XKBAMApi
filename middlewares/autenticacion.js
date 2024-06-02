const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const { GeneraToken } = require('../services/jwtoken.service');
const ClaimTypes = require('../config/claimtypes');

const Authorize = (roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.header('Authorization');
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Token de autorización no válido' });
            }

            const token = authHeader.split(' ')[1];
            const decodedToken = jwt.verify(token, jwtSecret);

            const rolesArray = roles.split(',');

            if (!rolesArray.includes(decodedToken[ClaimTypes.Role])) {
                return res.status(403).json({
                    message: 'No cuentas con los permisos para realizar la solicitud',
                    permittedRoles: rolesArray
                });
            }

            req.decodedToken = decodedToken;

            const minutosRestantes = (decodedToken.exp - Math.floor(Date.now() / 1000)) / 60;

            if (minutosRestantes < 5) {
                const nuevoToken = GeneraToken(
                    decodedToken[ClaimTypes.Name], 
                    decodedToken[ClaimTypes.GivenName], 
                    decodedToken[ClaimTypes.Role]
                );
                res.setHeader("Set-Authorization", `Bearer ${nuevoToken}`);
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token de autorización no válido', error: error.message });
        }
    };
};

module.exports = Authorize;
