import React from 'react';
import { IconButton, Stack, useTheme } from '@mui/material';
import { ExitToAppOutlined as ExitToAppIcon, Delete } from '@mui/icons-material';

import taskService from '../../../services/TaskService';

const TaskActions = ({ selectedTask, setSelectedTask, setTasks }) => {
  const theme = useTheme();

  const closeTaskInfo = () => {
    setSelectedTask(null);
  }

  const onDeleteTask = () => {
    const taskId = selectedTask.id;

    setTasks(tasks => tasks.filter(task => task.id !== taskId));
    closeTaskInfo();
    taskService.deleteTask(taskId);
  }

  return (
    <Stack
      direction={'row'}
      width={'100%'}
      position={'absolute'}
      right={'0'}
      bottom={'0'}
      mt={2}
      textAlign="center"
      justifyContent={'space-between'}
      sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}
    >
      <IconButton color="primary" onClick={closeTaskInfo} aria-label="exit">
        <ExitToAppIcon />
      </IconButton>
      <IconButton color="error" onClick={onDeleteTask} aria-label="delete task">
        <Delete />
      </IconButton>
    </Stack>
  );
}

export default TaskActions;
