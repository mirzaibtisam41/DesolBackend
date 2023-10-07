const route = require('express').Router();
const { registerUser, loginUser } = require('../Controllers/user');
const { validateUser } = require("../Middleware/user");

route.post('/register', validateUser, registerUser);
route.post('/login', validateUser, loginUser);

module.exports = route;