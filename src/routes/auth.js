import express from 'express';
import controllers from './../controllers/authController.js';

const routerAuth = express.Router();

routerAuth.post('/', controllers.authUser)

module.exports = routerAuth;
