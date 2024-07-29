import React from 'react';
import { ListItem, ListItemIcon, Checkbox, IconButton, ListItemText, ListItemSecondaryAction, Typography, useTheme } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useSortable } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { CSS } from '@dnd-kit/utilities';

const Task = ({ task, onToggleCompleted, onToggleImportant, onClick }) => {

  const theme = useTheme();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id: task.id});

  const getTaskColor = () => {
    if (theme.palette.mode === 'dark') {
      return task.completed ? '#121212' : '#000';
    }
    return task.completed ? '#f0f0f0' : '#fff';
  }

  return (
    <ListItem

      
      onClick={onClick}

      ref={setNodeRef}

      style={{
        transition,
        transform: CSS.Transform.toString(transform),
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: '8px 0',
        padding: '16px',
        backgroundColor: getTaskColor(),
        cursor: 'pointer'
      }}
    >
      <IconButton {...attributes} {...listeners}>
        <DragIndicatorIcon />
      </IconButton>

      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.completed}
          tabIndex={-1}
          disableRipple
          onChange={(e) => {
            e.stopPropagation();
            onToggleCompleted(task.id);
          }}
        />
      </ListItemIcon>
      <ListItemText 
        primary={task.text} 
        secondary={
          <>
            {task.dueDate && (
              <Typography component="span" variant="body2" color="textPrimary">
                Due: {task.dueDate.toLocaleString()}
              </Typography>
            )}
            {task.reminder && (
              <Typography component="span" variant="body2" color="textPrimary">
                Reminder: {task.reminder.toLocaleString()}
              </Typography>
            )}
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
