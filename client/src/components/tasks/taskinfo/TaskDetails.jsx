import React from 'react';
import { TextField } from '@mui/material';

const TaskDetails = ({ task, handleTextChange }) => (
  <>
    <TextField
      label="Task Name"
      value={task.taskTitle}
      onChange={(e) => handleTextChange('taskTitle', e.target.value)}
      fullWidth
      variant="outlined"
      sx={{ mt: 2 }}
    />
    <TextField
      label="Task Description"
      value={task.taskDescription || ''}
      onChange={(e) => handleTextChange('taskDescription', e.target.value)}
      fullWidth
      variant="outlined"
      multiline
      rows={4}
      sx={{ mt: 2 }}
    />
  </>
);

export default TaskDetails;
