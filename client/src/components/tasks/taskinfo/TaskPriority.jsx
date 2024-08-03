import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { ProioirtyColor } from '../../../utils/constants';

const TaskPriority = ({ task, handlePriorityChange }) => (
  <>
    <ToggleButtonGroup
      value={task.taskPriority || 'Regular'}
      exclusive
      onChange={handlePriorityChange}
      aria-label="task priority"
      sx={{ mt: 2 }}
    >
      <ToggleButton
        value="Regular"
        aria-label="Regular"
        sx={{
          '&.Mui-selected': { bgcolor: ProioirtyColor['Regular'] }
        }}
      >
        Regular
      </ToggleButton>
      <ToggleButton
        value="Moderate"
        aria-label="Moderate"
        sx={{
          '&.Mui-selected': { bgcolor: ProioirtyColor['Moderate'] }
        }}
      >
        Moderate
      </ToggleButton>
      <ToggleButton
        value="High"
        aria-label="High"
        sx={{
          '&.Mui-selected': { bgcolor: ProioirtyColor['High'] }
        }}
      >
        High
      </ToggleButton>
    </ToggleButtonGroup>
  </>
);

export default TaskPriority;
