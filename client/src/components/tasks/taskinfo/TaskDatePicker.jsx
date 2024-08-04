import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const TaskDatePicker = ({ selectedTask, handleTextChange }) => (
  <>
    <DatePicker
      label="Due Date"
      value={selectedTask.taskDueDate ? dayjs(selectedTask.taskDueDate) : null}
      onChange={(date) => handleTextChange('taskDueDate', date)}
      textField={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
      fullWidth
      minDate={dayjs()}
      sx={{ mt: 2 }}
    />
  </>
);

export default TaskDatePicker;
