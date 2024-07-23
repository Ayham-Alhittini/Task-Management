
import taskService from '../services/TaskService.js';

class TaskController {
    async createTask(req, res) {
        const newTask = await taskService.createTask({ ...req.body, taskAssociatedUser: req.user.userId });
        res.status(201).send({ task: newTask });
    }

    async getUserTasks(req, res) {
        const userId = req.user.userId;
        const queryParams = req.query;
        const tasks = await taskService.getUserTasks(userId, queryParams);
        res.send({ tasks });
    }

    async updateTask(req, res) {
        const userId = req.user.userId;
        const taskId = req.params.id;
        const updates = req.body;

        const updatedTask = await taskService.updateUserTask(userId, taskId, updates);
        res.send({ task: updatedTask });
    }

    async deleteTask(req, res) {
        const userId = req.user.userId;
        const taskId = req.params.id;

        await taskService.deleteUserTask(userId, taskId);
        res.status(204).send();
    }
}

export default new TaskController();
