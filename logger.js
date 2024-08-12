const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

// Configuración para los registros de las solicitudes
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'request.log'),
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  format: winston.format.json(),
});

// Configuración para los registros de los errores
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'error.log'),
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
