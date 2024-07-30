import React, { useState, useEffect } from 'react';
import { Box, Stack, Skeleton, TextField, List, Typography, useTheme, IconButton, InputAdornment } from '@mui/material';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AddCircleOutline } from '@mui/icons-material';
import Task from './Task'; // Assuming Task component is defined elsewhere
import TaskInfo from './TaskInfo';
import { useParams } from 'react-router-dom';

const Tasks = () => {

  const params = useParams();

  const categories = {
    today: 'My Day',
    important: 'Important',
    planned: 'Planned',
    assigned_to_me: 'Assigned to me',
    inbox: 'Tasks'
  };


  const initialTasks = [
    {
      id: 1,
      text: 'Initial Task 1',
      completed: false,
    },
    {
      id: 2,
      text: 'Initial Task 2',
      completed: true,
    },
  ];

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(initialTasks);
  const [taskText, setTaskText] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [category, setCategory] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (params) setCategory(params.category);
  }, [params]);

  const handleAddTask = () => {
    if (taskText.trim()) {
      const newTaskObj = {
        id: tasks.length + 1,
        text: taskText,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setTaskText('');
      setSelectedTask(newTaskObj);
    }
  };

  const handleToggleCompleted = (id) => {
    console.log('entered');
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTasks((tasks) => {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      return arrayMove(tasks, oldIndex, newIndex);
    });
  };

  const onTaskClicked = (task) => {
    setSelectedTask(task);
  };

  const onDeleteTask = (taskId) => {
    setTasks(tasks => tasks.filter(task => task.id !== taskId));
  }

  return (
    <Stack
      direction={'row'}
      flex={6}
    >
      <Box
        flex={5}
        p={2}
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
            <Typography variant="h5" gutterBottom>{categories[category]}</Typography>

            {/* Task Input Bar */}
            <Box display="flex" alignItems="center" mb={2}>
              <TextField
                label="Add a task"
                variant="outlined"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTask();
                  }
                }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        aria-label="add task"
                        onClick={handleAddTask}
                      >
                        <AddCircleOutline />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                <List
                  sx={{
                    mt: 2,
                    height: '75vh', // Set a specific height for the task list
                    overflowY: 'auto', // Enable vertical scrolling
                  }}
                >
                  {tasks.map(task => (
                    <Task
                      key={task.id}
                      task={task}
                      onToggleCompleted={handleToggleCompleted}
                      onClick={() => onTaskClicked(task)}
                    />
                  ))}
                </List>
              </SortableContext>
            </DndContext>
          </Box>
        )}
      </Box>
      <TaskInfo task={selectedTask} setTask={setSelectedTask} deleteTask={onDeleteTask} />
    </Stack>
  );
};

export default Tasks;
