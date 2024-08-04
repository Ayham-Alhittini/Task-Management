import React from 'react';
import { List } from '@mui/material';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskListItem from './taskItem/Index';
import { useTasks } from '../../context/TasksContext';

function TaskList() {

  const { tasks, setTasks } = useTasks();

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTasks((tasks) => {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      return arrayMove(tasks, oldIndex, newIndex);
    });
  };


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <List
          sx={{
            mt: 2,
            height: '70vh',
            overflowY: 'auto',
          }}
        >
          {
            tasks.map((task) => (
              <TaskListItem
                key={task.id}
                task={task}
              />
            ))
          }
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
