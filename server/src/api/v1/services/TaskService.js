import Task from '../models/Task.js';

class TaskService {
    createTask(taskData) {
        const task = new Task(taskData);
        return task.save();
    }

    getUserTasks(userId, queryParams) {
        const query = this.buildQuery(userId, queryParams);
        const sortOptions = this.buildSortOptions(queryParams);
    
        return Task.find(query).sort(sortOptions);
    }
    
    buildQuery(userId, queryParams) {
        const query = { taskAssociatedUser: userId };
    
        for (const [key, value] of Object.entries(queryParams)) {
            if (key !== 'sortBy' && key !== 'order') {
                query[key] = value;
            }
        }
    
        return query;
    }
    
    buildSortOptions(queryParams) {
        const sortOptions = {};
    
        if (queryParams.sortBy) {
            const sortOrder = queryParams.order === 'desc' ? -1 : 1;
            sortOptions[queryParams.sortBy] = sortOrder;
        } else {
            // Default sorting by creation date descending if no sort option is provided
            sortOptions.createdAt = -1;
        }
    
        return sortOptions;
    }
    
    updateTask(taskId, updates) {
        return Task.findByIdAndUpdate(taskId, updates, { new: true, runValidators: true });
    }

    deleteTask(taskId) {
        return Task.findByIdAndDelete(taskId);
    }

    getTask(taskId) {
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
