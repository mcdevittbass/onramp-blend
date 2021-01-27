const express = require('express');
const blogController = require('./blogController');

export const blogRouter = express.Router();

//all routes are prepended with /blog
blogRouter.get('/', blogController.getBlog);
blogRouter.post('/', blogController.postBlog);
blogRouter.delete('/', blogController.deleteBlog);
blogRouter.put('/', blogController.updateBlog);

blogRouter.get('/:blogID', blogController.getOneBlog);