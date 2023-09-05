const { createLogger, transports, format } = require('winston');
const dotenv = require('dotenv')

dotenv.config();

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}

const customColorsOptions = {
    fatal: 'red', error: 'yellow', warning: 'magenta', info: 'green', http: 'cyan', debug: 'blue'
}

// Configuración del logger de desarrollo
const developmentLogger = createLogger({
    levels: customLevelOptions.levels,
    format: format.combine(
        format.colorize({ all: true, colors: customColorsOptions }),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console({ level: 'debug' }),
    ],
});

// Configuración del logger de producción
const productionLogger = createLogger({
    levels: customLevelOptions.levels,
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize({ all: true, colors: customColorsOptions }),
            ),
        }),

        new transports.File({ filename: 'errors.log', level: 'error' }),
    ],
});

module.exports = process.env.ENV === 'prod' ? productionLogger : developmentLogger;