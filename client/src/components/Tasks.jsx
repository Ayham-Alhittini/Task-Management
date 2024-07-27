import React, { useState, useEffect } from 'react';
import { Box, Stack, Skeleton, TextField, List, Divider, Typography, useTheme } from '@mui/material';
import Task from './Task';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const Tasks = ({ setSelectedTask }) => {

  const initialTasks = [
    {
      id: 1,
      text: 'Initial Task 1',
      completed: false,
      important: false,
      dueDate: new Date(),
      reminder: new Date(),
      steps: [],
      notes: 'Note for task 1'
    },
    {
      id: 2,
      text: 'Initial Task 2',
      completed: true,
      important: true,
      dueDate: new Date(),
      reminder: new Date(),
      steps: [],
      notes: 'Note for task 2'
    },
  ];

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [reminder, setReminder] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        completed: false,
        important: false,
        dueDate,
        reminder,
        steps: [],
        notes: ''
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setDueDate(null);
      setReminder(null);
      setSelectedTask(newTaskObj);
    }
  };

  const handleToggleCompleted = (id) => {
    console.log('completed toggled');
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleToggleImportant = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, important: !task.important } : task
    ));
  };

  const onDragEnd = (event) => {
    console.log('drag and drop toggled');
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      return arrayMove(tasks, oldIndex, newIndex);
    });
};


  return (
    <Box 
      flex={4} 
      p={{ xs: 0, md: 2 }} 
      bgcolor={theme.palette.mode === 'light' ? '#FAF9F8' : '#000'}
    >
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={100} />
        </Stack>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>Tasks</Typography>
          
          <TextField 
            label="Add a task" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          />


          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                <List sx={{ mt: 2 }}>
                  {
                    tasks.map(task => (
                      <Task key={task.id}
                        task={task}
                        onToggleCompleted={handleToggleCompleted}
                        onToggleImportant={handleToggleImportant}
                        onClick={() => setSelectedTask(task)}
                      />
                    ))
                  }
                </List>
              </SortableContext>
          </DndContext>

        </Box>
      )}
    </Box>
  );
};

export default Tasks;
