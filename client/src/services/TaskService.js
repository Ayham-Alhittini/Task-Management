import axiosInstance from '../utils/axiosInstance';

class TaskService {

  getTasks() {
    return axiosInstance.get('/task/get');
  }

  createTask(task) {
    return axiosInstance.post('/task/create', task);
  }

  deleteTask(taskId) {
    return axiosInstance.delete(`/task/delete/${taskId}`)
  }

  updateTask(taskId, updatedTask) {
    return axiosInstance.patch(`/task/update/${taskId}`, updatedTask)
  }

}

export default new TaskService();