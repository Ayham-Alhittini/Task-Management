import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import TaskDetails from './TaskDetails';
import TaskDatePicker from './TaskDatePicker';
import TaskSteps from './TaskSteps';
import TaskPriority from './TaskPriority';
import TaskActions from './TaskActions';

import taskService from '../../../services/TaskService';

const TaskInfo = ({ task, setTask, deleteTask }) => {
  const theme = useTheme();

  if (!task) {
    return null;
  }

  const handleTextChange = (field, value) => {
    setTask({ ...task, [field]: value });
    taskService.updateTask(task.id, { [field]: value });
  };

  const handleAddStep = (step) => {
    setTask({ ...task, steps: [...task.steps, step] });
  };

  const handleRemoveStep = (index) => {
    const newSteps = task.steps.filter((_, i) => i !== index);
    setTask({ ...task, steps: newSteps });
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    setTask(null);
  };

  const handlePriorityChange = (event, newPriority) => {
    if (newPriority !== null) {
      setTask({ ...task, taskPriority: newPriority });
      taskService.updateTask(task.id, { taskPriority: newPriority });
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
      <Typography variant="h5" gutterBottom>{task.taskTitle}</Typography>
      <TaskDetails task={task} handleTextChange={handleTextChange} />
      <TaskDatePicker task={task} handleTextChange={handleTextChange} />
      <TaskSteps task={task} handleAddStep={handleAddStep} handleRemoveStep={handleRemoveStep} />
      <TaskPriority task={task} handlePriorityChange={handlePriorityChange} />
      <TaskActions setTask={setTask} handleDeleteTask={handleDeleteTask} />
    </Box>
  );
};

export default TaskInfo;
