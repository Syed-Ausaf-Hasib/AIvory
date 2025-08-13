import express from 'express';
import { getPublishedCreations, getUserCreations, toggleLikeCreation } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.get('/get-user-creations', auth, getUserCreations)
userRouter.get('/get-published-creations', auth, getPublishedCreations)
// This one is a post because we have to send the creation id in the body
userRouter.post('/toggle-like-creation', auth, toggleLikeCreation)

export default userRouter;