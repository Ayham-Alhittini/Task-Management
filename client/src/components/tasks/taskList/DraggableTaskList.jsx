import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, List, Typography } from '@mui/material';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskListItem from '../taskItem/Index';
import { useTasks } from '../../../context/TasksContext';
import { isToday } from '../../../utils/dateHelpers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function DraggableTaskList({ isMyDay }) {

  const { tasks, setTasks } = useTasks();

  const [completedTasks, setCompletedTasks] = useState([]);
  const [notCompletedTasks, setNotCompletedTasks] = useState([]);

  useEffect(() => {

    const completed = tasks.filter(task => task.isTaskCompleted);
    const notCompleted = tasks.filter(task => !task.isTaskCompleted);

    if (isMyDay) {
      setCompletedTasks(completed.filter(task => isToday(new Date(task.taskDay))));
      setNotCompletedTasks(notCompleted.filter(task => isToday(new Date(task.taskDay))));
    } else {
      setCompletedTasks(completed);
      setNotCompletedTasks(notCompleted);
    }
  }, [isMyDay, tasks]);


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
    <List
      sx={{
        mt: 2,
        height: '70vh',
        overflowY: 'auto',
      }}
    >
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={notCompletedTasks} strategy={verticalListSortingStrategy}>
          <List>
            {
              notCompletedTasks.map((task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  draggable={true}
                />
              ))
            }
          </List>
        </SortableContext>
      </DndContext>

      <Accordion sx={{ mx: '1px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{`Completed (${completedTasks.length})`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            completedTasks.map(task => (
              <TaskListItem key={task.id} task={task} draggable={false} />
            ))
          }
        </AccordionDetails>
      </Accordion>
    </List>

  );
};

export default DraggableTaskList;
