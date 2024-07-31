import React from 'react';
import { Box, Typography, TextField, List, ListItem, ListItemText, Divider, Button, useTheme, IconButton, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ExitToAppOutlined as ExitToAppIcon, Delete } from '@mui/icons-material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const TaskInfo = ({ task, setTask, deleteTask }) => {
  const theme = useTheme();

  if (!task) {
    return <></>;
  }

  const handleTextChange = (field, value) => {
    setTask({ ...task, [field]: value });
  };

  const handleAddStep = (step) => {
    setTask({ ...task, steps: [...task.steps, step] });
  };

  const handleRemoveStep = (index) => {
    const newSteps = task.steps.filter((_, i) => i !== index);
    setTask({ ...task, steps: newSteps });
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    setTask(null);
  };

  const handlePriorityChange = (event, newPriority) => {
    if (newPriority !== null) {
      setTask({ ...task, priority: newPriority });
    }
  };

  return (
    <Box position={'relative'} p={2} flex={1} sx={{ height: 'calc(100vh - 64px)', borderLeft: `1px solid ${theme.palette.divider}`, boxShadow: '-1px 0px 2px rgba(0, 0, 0, 0.1)', bgcolor: theme.palette.background.paper }}>
      <Typography variant="h5" gutterBottom>{task.text}</Typography>

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

      {/* Due Date */}
      <DatePicker
        label="Due Date"
        value={task.dueDate ? dayjs(task.dueDate) : null}
        onChange={(date) => handleTextChange('dueDate', date)}
        textField={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
        fullWidth
        minDate={dayjs()}
        sx={{ mt: 2 }}
      />

      {/* Reminder */}
      <DateTimePicker
        label="Reminder"
        value={task.reminder ? dayjs(task.reminder) : null}
        onChange={(dateTime) => handleTextChange('reminder', dateTime)}
        textField={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
        fullWidth
        minDateTime={dayjs()}
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

      {/* Task Priority */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Priority</Typography>
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

      {/* Footer Actions */}
      <Stack direction={'row'} width={'100%'} position={'absolute'} right={'0'} bottom={'0'} mt={2} textAlign="center" justifyContent={'space-between'} sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
        <IconButton color="primary" onClick={() => setTask(null)} aria-label="exit">
          <ExitToAppIcon />
        </IconButton>
        <IconButton color="error" onClick={handleDeleteTask} aria-label="delete task">
          <Delete />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default TaskInfo;
