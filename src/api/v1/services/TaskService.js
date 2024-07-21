
import Task from '../models/Task.js';

class TaskService {
    async createTask(taskDate) {
        const task = new Task({ ...taskDate });
        await task.save();
    }
    
    async updateTask(taskId, updates) {
        return await Task.findByIdAndUpdate(taskId, updates, { new: true, runValidators: true });
    }

    async deleteTask(taskId) {
        return await Task.findByIdAndDelete(taskId);
    }

    async getTask(taskId) {
        return await Task.findById(taskId);
    }

    async getUserTasks(userId) {
        return await Task.find({ taskAssociatedUser: userId });
    }
}

export default new TaskService();
