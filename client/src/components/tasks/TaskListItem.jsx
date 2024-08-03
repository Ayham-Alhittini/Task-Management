import React from 'react';
import { ListItem, IconButton, ListItemText, ListItemSecondaryAction, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { CSS } from '@dnd-kit/utilities';
import Typography from '@mui/material/Typography';

const DragHandle = ({ attributes, listeners }) => (
  <IconButton {...attributes} {...listeners}>
    <DragIndicatorIcon />
  </IconButton>
);

const TaskCheckbox = ({ completed, onToggle, taskId }) => (
  <Checkbox
    edge="start"
    checked={completed}
    tabIndex={-1}
    disableRipple
    onClick={(event) => {
      event.stopPropagation();
      onToggle(taskId);
    }}
  />
);

const TaskText = ({ text, completed, dueDate, reminder }) => (
  <ListItemText
    primary={text}
    secondary={
      <>
        {dueDate && (
          <Typography component="span" variant="body2" color="textPrimary">
            Due: {dueDate.toLocaleString()}
          </Typography>
        )}
        {reminder && (
          <Typography component="span" variant="body2" color="textPrimary">
            Reminder: {reminder.toLocaleString()}
          </Typography>
        )}
      </>
    }
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  />
);

const TaskActions = ({ important }) => (
  <ListItemSecondaryAction>
    <IconButton edge="end">
      {important ? <StarIcon color="primary" /> : <StarBorderIcon />}
    </IconButton>
  </ListItemSecondaryAction>
);

const TaskListItem = ({ task, onToggleCompleted, onClick }) => {
  const theme = useTheme();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const getTaskColor = () => {
    if (theme.palette.mode === 'dark') {
      return task.isTaskCompleted ? '#121212' : '#000';
    }
    return task.isTaskCompleted ? '#f0f0f0' : '#fff';
  };

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
        cursor: 'pointer',
      }}
    >
      <DragHandle attributes={attributes} listeners={listeners} />
      <TaskCheckbox completed={task.isTaskCompleted} onToggle={onToggleCompleted} taskId={task.id} />
      <TaskText text={task.taskTitle} completed={task.isTaskCompleted} dueDate={task.taskDueDate} reminder={task.reminder} />
      <TaskActions important={task.taskPriority} />
    </ListItem>
  );
};

export default TaskListItem;
