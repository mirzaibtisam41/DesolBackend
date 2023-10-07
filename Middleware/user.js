const { check } = require('express-validator');
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        req.user = decoded._id;
        next();
    } catch (error) {
        return res.status(400).json({ Error: 'User not authorized to perform this task' })
    }
}

module.exports = {
    validateUser: [
        check('email', 'Email Invalid').isEmail(),
        check('password', 'Password should be minimum of 5 characters').isLength({ min: 5 })
    ],
    validateToken
};

