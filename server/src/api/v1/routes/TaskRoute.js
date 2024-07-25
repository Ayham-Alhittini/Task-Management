import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import taskController from '../controllers/TaskController.js';
const router = express.Router();

router.post('/create', asyncHandler(taskController.createTask));
router.get('/get', asyncHandler(taskController.getUserTasks));
router.patch('/update/:id', asyncHandler(taskController.updateTask));
router.delete('/delete/:id', asyncHandler(taskController.deleteTask));

export default router;
