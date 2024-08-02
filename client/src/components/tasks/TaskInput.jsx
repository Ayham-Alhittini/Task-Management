import React from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

const TaskInput = ({ taskText, setTaskText, handleAddTask }) => (
  <Box display="flex" alignItems="center" mb={2}>
    <TextField
      label="Add a task"
      variant="outlined"
      value={taskText}
      onChange={(e) => setTaskText(e.target.value)}
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

export default TaskInput;
