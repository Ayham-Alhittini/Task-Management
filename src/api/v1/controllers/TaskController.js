
import taskService from '../services/TaskService.js';

class TaskController {
    async createTask(req, res) {
        await taskService.createTask({ ...req.body, taskAssociatedUser: req.user.userId });
        res.status(201).send();
    }

    async getUserTasks(req, res) {
        const userId = req.user.userId;
        const queryParams = req.query;
        res.send(await taskService.getUserTasks(userId, queryParams));
    }

    async updateTask(req, res) {
        const userId = req.user.userId;
        const taskId = req.params.id;
        const updates = req.body;

        const updatedTask = await taskService.updateUserTask(userId, taskId, updates);
        res.send(updatedTask);
    }

    async deleteTask(req, res) {
        const userId = req.user.userId;
        const taskId = req.params.id;

        const deletedTask = await taskService.deleteUserTask(userId, taskId);
        res.send(deletedTask);
    }
}

export default new TaskController();
