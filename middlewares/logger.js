const logger = require('../logs/errorlogger');

const errorLogger = (err, req, res, next) => {
  logger.error(err.message); 
  next(err);
};

module.exports = errorLogger;