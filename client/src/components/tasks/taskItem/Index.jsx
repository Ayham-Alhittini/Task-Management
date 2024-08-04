import React from 'react';
import { ListItem, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSelectedTask } from '../../../context/SelectedTaskContext';
import TaskText from './TaskText';
import TaskCheckbox from './TaskCheckbox';
import DragHandle from './DragHandle';
import TaskPriority from './TaskPriority';

function TaskListItem({ task }) {

  const theme = useTheme();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const { selectedTask, setSelectedTask } = useSelectedTask();

  const getTaskColor = () => {
    if (theme.palette.mode === 'dark') {
      return task.isTaskCompleted ? '#121212' : '#000';
    }
    return task.isTaskCompleted ? '#f0f0f0' : '#fff';
  };

  return (
    <ListItem
      onClick={() => setSelectedTask(task)}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
        border: `${task.id === selectedTask?.id ? '2px solid #1976d2' : '1px solid #ccc'}`,
        borderRadius: '8px',
        margin: '8px 0',
        padding: '5px',
        backgroundColor: getTaskColor(),
        cursor: 'pointer',
        height: '70px'
      }}
    >
      <DragHandle attributes={attributes} listeners={listeners} />
      <TaskCheckbox taskId={task.id} isTaskCompleted={task.isTaskCompleted} />
      <TaskText text={task.taskTitle} isTaskCompleted={task.isTaskCompleted} dueDate={task.taskDueDate} />
      <TaskPriority priority={task.taskPriority} />
    </ListItem>
  );
};

export default TaskListItem;
