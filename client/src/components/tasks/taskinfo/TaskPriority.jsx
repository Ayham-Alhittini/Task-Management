import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const TaskPriority = ({ task, handlePriorityChange }) => (
  <>
    <ToggleButtonGroup
      value={task.priority || 'Regular'}
      exclusive
      onChange={handlePriorityChange}
      aria-label="task priority"
      sx={{ mt: 2 }}
    >
      <ToggleButton
        value="Regular"
        aria-label="Regular"
        sx={{
          '&.Mui-selected': { bgcolor: '#d3d3d3' }
        }}
      >
        Regular
      </ToggleButton>
      <ToggleButton
        value="Moderate"
        aria-label="Moderate"
        sx={{
          '&.Mui-selected': { bgcolor: '#ffb74d' }
        }}
      >
        Moderate
      </ToggleButton>
      <ToggleButton
        value="High"
        aria-label="High"
        sx={{
          '&.Mui-selected': { bgcolor: '#f44336' }
        }}
      >
        High
      </ToggleButton>
    </ToggleButtonGroup>
  </>
);

export default TaskPriority;
