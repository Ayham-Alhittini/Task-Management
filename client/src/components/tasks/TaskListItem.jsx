import React from 'react';
import { ListItem, IconButton, ListItemText, ListItemSecondaryAction, useTheme, Chip } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Checkbox from '@mui/material/Checkbox';
import { CSS } from '@dnd-kit/utilities';
import EventIcon from '@mui/icons-material/Event';
import { ProioirtyColor } from '../../utils/constants';
import dayjs from 'dayjs';

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

const TaskText = ({ text, completed, dueDate }) => (
  <ListItemText
    primary={text}
    secondary={
      <>
        {
          dueDate &&
          <Chip
            icon={<EventIcon />}
            label={dayjs(dueDate).format('MMMM D, YYYY')}
            component="span"
          />
        }
      </>
    }
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  />
);

const TaskPriority = ({ priority }) => (
  <ListItemSecondaryAction>
    <div style={{ width: '15px', height: '15px', backgroundColor: ProioirtyColor[priority], borderRadius: '50%' }}>
    </div>
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
        padding: '5px',
        backgroundColor: getTaskColor(),
        cursor: 'pointer',
        height: '70px'
      }}
    >
      <DragHandle attributes={attributes} listeners={listeners} />
      <TaskCheckbox completed={task.isTaskCompleted} onToggle={onToggleCompleted} taskId={task.id} />
      <TaskText text={task.taskTitle} completed={task.isTaskCompleted} dueDate={task.taskDueDate} reminder={task.reminder} />
      <TaskPriority priority={task.taskPriority} />
    </ListItem>
  );
};

export default TaskListItem;
