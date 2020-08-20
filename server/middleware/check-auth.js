const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({
        status: 401,
        Message: 'Access Denied, this is authenticated, if you logged in access will be granted'
    })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'Auth Failed'
        });
    }
};