/** 
 * Provides logger utility
 * @module
 */

const { createLogger, transports, format } = require('winston');

let loglevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "debug";

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${info.message}`
}))

const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.Console({ level: loglevel })
    ]
});

module.exports = logger;