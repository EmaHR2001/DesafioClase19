const EErrors = require('../../../services/errors/enums.js');

function errorHandlerMiddleware(error, req, res, next) {
    console.log(error.cause);
    switch (error.code) {
        case EErrors.INVALID_TYPES:
            res.send({ status: 'error', error: error.name });
            break;

        case EErrors.INVALID_PARAM:
            res.send({ status: 'error', error: error.name, cause: error.cause });
            break;

        case EErrors.CART_UPDATE_ERROR:
            res.send({ status: 'error', error: error.name, cause: error.cause });
            break;

        default:
            res.send({ status: 'error', error: 'Unhandled error' });
    }
}

module.exports = errorHandlerMiddleware;