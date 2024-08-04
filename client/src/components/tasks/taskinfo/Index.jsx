import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import TaskDetails from './TaskDetails';
import TaskDatePicker from './TaskDatePicker';
import TaskPriority from './TaskPriority';
import TaskActions from './TaskActions';

import taskService from '../../../services/TaskService';
import { useTasks } from '../../../context/TasksContext';
import { useSelectedTask } from '../../../context/SelectedTaskContext';

const TaskInfo = () => {
  const theme = useTheme();
  const { tasks, setTasks } = useTasks();
  const { selectedTask, setSelectedTask } = useSelectedTask();

  if (!selectedTask) {
    return null;
  }

  const handleUpdate = (field, value) => {
    const updatedTask = { ...selectedTask, [field]: value };
    setSelectedTask(updatedTask);
    taskService.updateTask(selectedTask.id, { [field]: value });
    notifyTasksComponent(updatedTask);
  };


  const notifyTasksComponent = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  }

  const handlePriorityChange = (event, newPriority) => {
    if (newPriority !== null) {
      handleUpdate('taskPriority', newPriority);
    }
  };

  return (
    <Box
      position="relative"
      p={2}
      flex={1}
      sx={{
        borderLeft: `1px solid ${theme.palette.divider}`,
        boxShadow: '-1px 0px 2px rgba(0, 0, 0, 0.1)',
        bgcolor: theme.palette.background.paper
      }}
    >
      <Typography variant="h5" gutterBottom>{selectedTask.taskTitle}</Typography>
      <TaskDetails selectedTask={selectedTask} handleTextChange={handleUpdate} />
      <TaskDatePicker selectedTask={selectedTask} handleTextChange={handleUpdate} />
      <TaskPriority selectedTask={selectedTask} handlePriorityChange={handlePriorityChange} />
      <TaskActions selectedTask={selectedTask} setSelectedTask={setSelectedTask} setTasks={setTasks} />
    </Box>
  );
};

export default TaskInfo;
