const { createLogger, transports, format } = require('winston');
const jwt = require('jsonwebtoken'); // Asegúrate de importar jwt
const ClaimTypes = require('../config/claimtypes'); // Importa ClaimTypes correctamente

const requestLogger = createLogger({
  transports: [
    new transports.File({
      filename: 'request.log',
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
});

const logRequest = (req, res, next) => {
  const ip = req.ip;
  let user = 'Usuario desconocido';
  let role = 'Rol desconocido';

  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedToken) {
        console.log('Decoded Token:', decodedToken); // Añade esto para depuración
        user = decodedToken[ClaimTypes.Name] || user;
        role = decodedToken[ClaimTypes.Role] || role;
      }
    } catch (error) {
      console.error('Error al decodificar el token JWT:', error.message);
    }
  } else {
    console.log('No Authorization header or token found');
  }

  requestLogger.info({
    method: req.method,
    url: req.url,
    ip: ip,
    user: user,
    role: role
  });

  next();
};

module.exports = logRequest;