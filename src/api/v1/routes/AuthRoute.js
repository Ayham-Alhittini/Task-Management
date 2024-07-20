import express from 'express';
import authController from '../controllers/AuthController.js';
import authenticationMiddleware from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/singUp', authController.signUp);
router.post('/login', authController.login);
router.post('/generateAccessToken', authController.generateAccessToken);
router.delete('/logout', (authenticationMiddleware), authController.logout);

export default router;
