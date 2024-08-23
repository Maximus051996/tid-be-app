const { secret_key } = require('../config');
const jwt = require('jsonwebtoken');

function authenticateToken() {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = user;

            // // Check if user has any of the required roles
            // if (!requiredRoles.includes(user.roleId)) {
            //     return res.status(403).json({ message: 'Forbidden. Access denied for role.' });
            // }

            next();
        });
    };
}

module.exports = authenticateToken;