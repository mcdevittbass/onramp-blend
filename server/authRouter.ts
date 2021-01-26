const express = require('express');
const authController = require('./authController');

export const authRouter = express.Router();

authRouter.post('/', authController.logIn);