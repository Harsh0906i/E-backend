
function errorHandler(statusCode, message, next) {
    const err = new Error()
    err.statusCode = statusCode;
    err.message = message
    return err
}
module.exports = errorHandler;