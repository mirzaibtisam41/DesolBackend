const UserModel = require('../Models/user');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

class User {

    registerUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        UserModel.create(req.body)
            .then(user => {
                let userObj = user.toObject();
                delete userObj.password;
                return res.status(200).json({ success: true, message: 'User Added Successfully', user: userObj })
            })
            .catch(err => {
                return res.status(200).json({ success: false, message: err });
            });

    }

    async loginUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            const match = passwordHash.verify(password, user.password);
            if (match) {
                let userObj = user.toObject();
                delete userObj.password;
                var token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                return res.status(200).json({ success: true, token });
            } else {
                return res.status(400).json({ success: false, message: 'Your Password is not matched' })
            }
        }
        else {
            return res.status(400).json({ success: false, message: 'Sorry, This email is not exist' });
        }
    }
}

const user = new User();
module.exports = user;