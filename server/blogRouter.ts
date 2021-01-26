const express = require('express');
const blogController = require('./blogController');

export const blogRouter = express.Router();

blogRouter.get('/', blogController.getBlog);