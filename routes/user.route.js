import express from 'express';
import { loginUser, signupUser } from '../controller/user.controller.js';

const router = express.Router();

//login route
router 
        .route('/login')
        .post(loginUser)

//sigun up route
router 
        .route('/signup')
        .post(signupUser)

export {router as userRouter}