import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import TaskLoader from './TaskLoader';
import TaskInfo from './taskinfo/Index';
import { arrayMove } from '@dnd-kit/sortable';
import { useSidebarStatus } from '../../context/SidebarStatusContext';

import taskService from '../../services/TaskService';

const Tasks = () => {
  const theme = useTheme();
  const params = useParams();
  const { isLargeScreen } = useSidebarStatus();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [category, setCategory] = useState(null);

  const categories = {
    today: 'My Day',
    important: 'Important',
    planned: 'Planned',
    assigned_to_me: 'Assigned to me',
    inbox: 'Tasks'
  };

  useEffect(() => {
    if (params) {
      setCategory(params.category);
      setSelectedTask(null);
    }

    taskService.getTasks().then(response => {
      setTasks(response.data.tasks);
      setLoading(false);
    });
  }, [params]);


  const handleAddTask = async () => {
    const taskTitle = taskText.trim();
    if (taskTitle) {

      const response = await taskService.createTask({ taskTitle });
      const newTask = response.data.task;

      setTasks([newTask, ...tasks]);
      setTaskText('');
      setSelectedTask(newTask);
    }
  };

  const handleToggleCompleted = (id) => {
    const toggledTask = tasks.find(task => task.id === id);
    toggledTask.isTaskCompleted = !toggledTask.isTaskCompleted;

    setTasks(tasks.map(task =>
      task.id === id ? toggledTask : task
    ));

    taskService.updateTask(id, { isTaskCompleted: toggledTask.isTaskCompleted });
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
    taskService.deleteTask(taskId);
    setTasks(tasks => tasks.filter(task => task.id !== taskId));
  }

  return (
    <Stack direction={'row'} flex={6}>
      <Box
        display={selectedTask && !isLargeScreen ? 'none' : 'block'}
        flex={5}
        p={2}
        bgcolor={theme.palette.mode === 'light' ? '#FAF9F8' : '#000'}
      >
        {loading ? (
          <TaskLoader />
        ) : (
          <Box>
            <Typography variant="h5" gutterBottom>{categories[category]}</Typography>
            <TaskInput
              taskText={taskText}
              setTaskText={setTaskText}
              handleAddTask={handleAddTask}
            />
            <TaskList
              tasks={tasks}
              handleToggleCompleted={handleToggleCompleted}
              onTaskClicked={onTaskClicked}
              onDragEnd={onDragEnd}
            />
          </Box>
        )}
      </Box>
      <TaskInfo task={selectedTask} setTask={setSelectedTask} deleteTask={onDeleteTask} />
    </Stack>
  );
};

export default Tasks;
