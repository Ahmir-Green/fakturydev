var express = require('express');
const route = express.Router();

var userController = require('../controllers/user');

route.post('/signup', userController.user_signup);

route.post('/login', userController.user_login);

route.delete('/:userId', userController.user_delete);

route.get('/:email', userController.user_get);

module.exports = route;