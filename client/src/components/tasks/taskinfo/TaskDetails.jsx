import React from 'react';
import { TextField } from '@mui/material';

const TaskDetails = ({ task, handleTextChange }) => (
  <>
    <TextField
      label="Task Name"
      value={task.text}
      onChange={(e) => handleTextChange('text', e.target.value)}
      fullWidth
      variant="outlined"
      sx={{ mt: 2 }}
    />
    <TextField
      label="Notes"
      value={task.notes || ''}
      onChange={(e) => handleTextChange('notes', e.target.value)}
      fullWidth
      variant="outlined"
      multiline
      rows={4}
      sx={{ mt: 2 }}
    />
  </>
);

export default TaskDetails;
