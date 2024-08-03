import React from 'react';
import { List } from '@mui/material';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskListItem from './TaskListItem';

const TaskList = ({ tasks, handleToggleCompleted, onTaskClicked, onDragEnd }) => (
  <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
      <List
        sx={{
          mt: 2,
          height: '70vh',
          overflowY: 'auto',
        }}
      >
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onToggleCompleted={handleToggleCompleted}
            onClick={() => onTaskClicked(task)}
          />
        ))}
      </List>
    </SortableContext>
  </DndContext>
);

export default TaskList;
