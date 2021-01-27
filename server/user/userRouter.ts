const express = require('express');
const userController = require('./userController');

export const userRouter = express.Router();

//all routes are prepended with /user
userRouter.post('/login', userController.user_logIn_post);
userRouter.post('/signup', userController.user_signUp_post);
/*log out is controlled on the front end - removing token from session storage*/

userRouter.get('/info/:userID', userController.user_info_getBlogIDs);

userRouter.get('/favorites/:userID', userController.user_get_favorites);
userRouter.put('/favorites/:userID', userController.user_update_favorites);