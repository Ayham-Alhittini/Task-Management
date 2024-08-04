import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useTasks } from '../../context/TasksContext';
import { useSelectedTask } from '../../context/SelectedTaskContext';

import taskService from '../../services/TaskService';

const TaskInput = () => {

  const { tasks, setTasks } = useTasks();
  const { setSelectedTask } = useSelectedTask();

  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = async () => {
    if (taskTitle) {

      const response = await taskService.createTask({ taskTitle });
      const newTask = response.data.task;

      setTasks([newTask, ...tasks]);
      setTaskTitle('');
      setSelectedTask(newTask);
    }
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <TextField
        label="Add a task"
        variant="outlined"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddTask();
          }
        }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                aria-label="add task"
                onClick={handleAddTask}
              >
                <AddCircleOutline />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
};

export default TaskInput;
