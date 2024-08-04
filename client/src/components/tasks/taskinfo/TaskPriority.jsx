import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { PRIORITY_COLOR } from '../../../utils/constants';

const TaskPriority = ({ selectedTask, handlePriorityChange }) => (
  <>
    <ToggleButtonGroup
      value={selectedTask.taskPriority || 'Regular'}
      exclusive
      onChange={handlePriorityChange}
      aria-label="task priority"
      sx={{ mt: 2 }}
    >
      <ToggleButton
        value="Regular"
        aria-label="Regular"
        sx={{
          '&.Mui-selected': { bgcolor: PRIORITY_COLOR['Regular'] }
        }}
      >
        Regular
      </ToggleButton>
      <ToggleButton
        value="Moderate"
        aria-label="Moderate"
        sx={{
          '&.Mui-selected': { bgcolor: PRIORITY_COLOR['Moderate'] }
        }}
      >
        Moderate
      </ToggleButton>
      <ToggleButton
        value="High"
        aria-label="High"
        sx={{
          '&.Mui-selected': { bgcolor: PRIORITY_COLOR['High'] }
        }}
      >
        High
      </ToggleButton>
    </ToggleButtonGroup>
  </>
);

export default TaskPriority;
