const route = require('express').Router();
const { createCar } = require('../Controllers/car');
const { validateCar } = require("../Middleware/car");
const { validateToken } = require("../Middleware/user");

route.post('/add', validateToken, validateCar, createCar);

module.exports = route;