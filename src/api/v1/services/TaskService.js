import Task from '../models/Task.js';

class TaskService {
    async createTask(taskData) {
        const task = new Task(taskData);
        await task.save();
    }

    async getUserTasks(userId) {
        return Task.find({ taskAssociatedUser: userId });
    }

    async updateTask(taskId, updates) {
        return Task.findByIdAndUpdate(taskId, updates, { new: true, runValidators: true });
    }

    async deleteTask(taskId) {
        return Task.findByIdAndDelete(taskId);
    }

    async getTask(taskId) {
        return Task.findById(taskId);
    }

    async verifyTaskOwnership(userId, taskId) {
        const task = await this.getTask(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        if (userId !== task.taskAssociatedUser.toString()) {
            throw new Error('Forbidden');
        }
        return task;
    }

    async updateUserTask(userId, taskId, updates) {
        await this.verifyTaskOwnership(userId, taskId);
        return this.updateTask(taskId, updates);
    }

    async deleteUserTask(userId, taskId) {
        await this.verifyTaskOwnership(userId, taskId);
        return this.deleteTask(taskId);
    }
}

export default new TaskService();
