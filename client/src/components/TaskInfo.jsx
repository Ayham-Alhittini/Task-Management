import React from 'react';
import { Box, Typography, TextField, List, ListItem, ListItemText, Divider, Button, useTheme, IconButton, Stack } from '@mui/material';
import { ExitToAppOutlined as ExitToAppIcon, Delete } from '@mui/icons-material';

const TaskInfo = ({ task, setTask }) => {
  const theme = useTheme();

  if (!task) {
    return (
      <></>
    );
  }

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

  const handleDeleteTask = () => {
    // Implement the delete task functionality
    // Example:
    // deleteTask(task.id);
  };

  return (
    <Box position={'relative'} p={2} flex={1} sx={{ display: { xs: "none", sm: "block" }, height: 'calc(100vh - 64px)', borderLeft: `1px solid ${theme.palette.divider}`, boxShadow: '-1px 0px 2px rgba(0, 0, 0, 0.1)', bgcolor: theme.palette.background.paper }}>
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
