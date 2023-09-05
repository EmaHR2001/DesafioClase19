const { Errors } = require('../../../services/errors/enums.js');
const logger = require('../../../config/logger.config.js');

function errorHandlerMiddleware(error, req, res, next) {
    logger.error(error.cause);
    switch (error.code) {
        case Errors.GET_CART_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case Errors.ADD_PRODUCT_ERROR:
            res.send({ status: 'error', error: error.name, cause: error.cause });
            break;

        case Errors.CART_UPDATE_ERROR:
            res.send({ status: 'error', error: error.name, cause: error.cause });
            break;

        case Errors.DEL_PRODUCT_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case Errors.UPDATE_PRODUCT_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case Errors.EMPTY_CART_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case Errors.DEL_PRODUCT_CART_ERROR:
            res.send({ status: 'error', error: error.name });
            break;

        case Errors.GET_PRODUCT_ERROR:
            res.send({ status: 'error', error: error.name });
            break;
            
        default:
            res.send({ status: 'error', error: 'Unhandled error' });
    }
}

module.exports = errorHandlerMiddleware;