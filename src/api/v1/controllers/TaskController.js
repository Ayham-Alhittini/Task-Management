
import taskService from '../services/TaskService.js';

class TaskController {
    async createTask(req, res) {
        await taskService.createTask({ ...req.body, taskAssociatedUser: req.user.userId });
        res.status(201).send();
    }

    async getUserTasks(req, res) {
        const userId = req.user.userId;
        res.send(await taskService.getUserTasks(userId));
    }

    async updateTask(req, res) {
        const userId = req.user.userId;
        const taskId = req.params.id;
        const updates = req.body;

        const task = await taskService.getTask(taskId);

        if (!task) { return res.status(404).send(); }
        if (userId !== task.taskAssociatedUser.toString()) { return res.status(403).send(); }

        const updatedTask = await taskService.updateTask(taskId, updates);
        res.send(updatedTask);
    }

    async deleteTask(req, res) {
        const userId = req.user.userId;
        const taskId = req.params.id;

        const task = await taskService.getTask(taskId);

        if (!task) { return res.status(404).send(); }
        if (userId !== task.taskAssociatedUser.toString()) { return res.status(403).send(); }

        const updatedTask = await taskService.deleteTask(taskId);
        res.send(updatedTask);
    }
}

export default new TaskController();
