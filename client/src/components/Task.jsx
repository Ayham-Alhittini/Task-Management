import React from 'react';
import { ListItem, ListItemIcon, Checkbox, IconButton, ListItemText, ListItemSecondaryAction, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Task = ({ task, onToggleCompleted, onToggleImportant }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.completed}
          tabIndex={-1}
          disableRipple
          onChange={() => onToggleCompleted(task.id)}
        />
      </ListItemIcon>
      <ListItemText 
        primary={task.text} 
        secondary={
          <>
            <Typography component="span" variant="body2" color="textPrimary">
              {task.dueDate ? `Due: ${task.dueDate.toLocaleString()}` : ''}
            </Typography>
            <br />
            <Typography component="span" variant="body2" color="textPrimary">
              {task.reminder ? `Reminder: ${task.reminder.toLocaleString()}` : ''}
            </Typography>
          </>
        }
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => onToggleImportant(task.id)}>
          {task.important ? <StarIcon color="primary" /> : <StarBorderIcon />}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Task;
