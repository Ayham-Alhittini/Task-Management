import React, { useState, useEffect } from 'react';
import { Box, Stack, Skeleton, TextField, List, Divider, Typography, MenuItem, Select, useTheme } from '@mui/material';
import Task from './Task';
import { DateTimePicker } from '@mui/lab';

const Tasks = ({ setSelectedTask }) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [reminder, setReminder] = useState(null);
  const [category, setCategory] = useState('General');

  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: tasks.length,
        text: newTask,
        completed: false,
        important: false,
        dueDate,
        reminder,
        category,
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
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleToggleImportant = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, important: !task.important } : task
    ));
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
          <Typography variant="h5" gutterBottom>Task Category: {category}</Typography>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
          </Select>
          
          <TextField 
            label="Add a task" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <List sx={{ mt: 2 }}>
            {tasks.map(task => (
              <React.Fragment key={task.id}>
                <Task 
                  task={task}
                  onToggleCompleted={handleToggleCompleted}
                  onToggleImportant={handleToggleImportant}
                  onClick={() => setSelectedTask(task)}
                />
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Tasks;
