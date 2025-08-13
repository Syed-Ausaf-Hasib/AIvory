import express from 'express'
import { getTrustedUsersCount } from '../controllers/trustedController.js';

const trustRouter = express.Router();

// This is to display the trusted users
trustRouter.get('/get-trusted-users-count', getTrustedUsersCount)

export default trustRouter;