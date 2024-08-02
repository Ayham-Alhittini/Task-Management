import React from 'react';
import { List, ListItem, ListItemText, Divider, TextField, Button } from '@mui/material';

const TaskSteps = ({ task, handleAddStep, handleRemoveStep }) => (
  <>
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
  </>
);

export default TaskSteps;
