import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const TaskDatePicker = ({ task, handleTextChange }) => (
  <>
    <DatePicker
      label="Due Date"
      value={task.dueDate ? dayjs(task.dueDate) : null}
      onChange={(date) => handleTextChange('dueDate', date)}
      textField={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
      fullWidth
      minDate={dayjs()}
      sx={{ mt: 2 }}
    />
    <DateTimePicker
      label="Reminder"
      value={task.reminder ? dayjs(task.reminder) : null}
      onChange={(dateTime) => handleTextChange('reminder', dateTime)}
      textField={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
      fullWidth
      minDateTime={dayjs()}
      sx={{ mt: 2 }}
    />
  </>
);

export default TaskDatePicker;
