import express from 'express';
import authController from '../controllers/AuthController.js';
import asyncHandler from '../utils/asyncHandler.js';
import authenticationMiddleware from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/singUp', asyncHandler(authController.signUp));
router.post('/login', asyncHandler(authController.login));
router.delete('/logout', (authenticationMiddleware), asyncHandler(authController.logout)); // Protected
router.post('/generateAccessToken', asyncHandler(authController.generateAccessToken));

export default router;
