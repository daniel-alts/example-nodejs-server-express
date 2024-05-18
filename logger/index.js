const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' }) // save in a file called combined.log
    ]
  });

module.exports = logger;