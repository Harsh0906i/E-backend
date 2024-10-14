const jwt = require('jsonwebtoken');
const errorHandler = require('./errorhandler');

function verifyUser(req, res, next) {
    const token = req.cookies.access_token
    if (!token) {
        return next(errorHandler(404, 'You are Unauthorised'));
    }
    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'forbidden'));
        }
        req.user = user;
        next();
    })
};
module.exports = verifyUser;