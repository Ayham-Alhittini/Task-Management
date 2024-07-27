import React from 'react';
import { Box, Typography, TextField, List, ListItem, ListItemText, Divider, Button, useTheme } from '@mui/material';
import { DateTimePicker } from '@mui/lab';

const TaskInfo = ({ task, setTask }) => {
  const theme = useTheme();
  if (!task) {
    return (
      <Box p={2} flex={1.3}>
        <Typography variant="h6">Select a task to see details</Typography>
      </Box>
    );
  }

  const handleDateChange = (field, date) => {
    setTask({ ...task, [field]: date });
  };

  const handleTextChange = (field, text) => {
    setTask({ ...task, [field]: text });
  };

  const handleAddStep = (step) => {
    setTask({ ...task, steps: [...task.steps, step] });
  };

  const handleRemoveStep = (index) => {
    const newSteps = task.steps.filter((_, i) => i !== index);
    setTask({ ...task, steps: newSteps });
  };

  return (
    <Box p={2} flex={1.3} sx={{ display: { xs: "none", sm: "block" }, height: 'calc(100vh - 64px)', borderLeft: `1px solid ${theme.palette.divider}`, boxShadow: '-1px 0px 2px rgba(0, 0, 0, 0.1)', bgcolor: theme.palette.background.paper }}>
      <Typography variant="h5" gutterBottom>{task.text}</Typography>
      
      <TextField
        label="Task Name"
        value={task.text}
        onChange={(e) => handleTextChange('text', e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mt: 2 }}
      />

      <DateTimePicker
        label="Due Date"
        value={task.dueDate}
        onChange={(date) => handleDateChange('dueDate', date)}
        renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
      />

      <DateTimePicker
        label="Reminder"
        value={task.reminder}
        onChange={(date) => handleDateChange('reminder', date)}
        renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
      />

      <TextField
        label="Category"
        value={task.category}
        onChange={(e) => handleTextChange('category', e.target.value)}
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

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Steps</Typography>
      <TextField
        label="Add a step"
        variant="outlined"
        fullWidth
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddStep(e.target.value);
            e.target.value = '';
          }
        }}
        sx={{ mt: 2 }}
      />

      <List>
        {task.steps && task.steps.map((step, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={step} />
              <Button onClick={() => handleRemoveStep(index)}>Remove</Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TaskInfo;
