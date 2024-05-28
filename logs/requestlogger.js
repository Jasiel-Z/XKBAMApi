const { createLogger, transports, format } = require('winston');

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

module.exports = requestLogger;