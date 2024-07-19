import express from 'express';
import authController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/singUp', authController.signUp);
router.post('/login', authController.login);
// router.post('/token', token);
// router.delete('/logout', logout);

export default router;
