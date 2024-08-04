import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import TaskLoader from './TaskLoader';
import TaskInfo from './taskinfo/Index';
import { useSidebarStatus } from '../../context/SidebarStatusContext';
import { TasksContext } from '../../context/TasksContext';
import { SelectedTaskContext } from '../../context/SelectedTaskContext';
import { CATEGORIES } from '../../utils/constants';

import taskService from '../../services/TaskService';

const Tasks = () => {
  const theme = useTheme();
  const params = useParams();
  const { isLargeScreen } = useSidebarStatus();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [category, setCategory] = useState(null);

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


  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <SelectedTaskContext.Provider value={{ selectedTask, setSelectedTask }}>
        <Stack direction={'row'} flex={6}>
          {
            !(selectedTask && !isLargeScreen) &&

            <Box
              flex={5}
              p={2}
              bgcolor={theme.palette.mode === 'light' ? '#FAF9F8' : '#000'}
            >
              {loading ? (
                <TaskLoader />
              ) : (
                <Box>
                  <Typography variant="h5" gutterBottom>{CATEGORIES[category]}</Typography>
                  <TaskInput />
                  <TaskList />
                </Box>
              )}
            </Box>
          }
          <TaskInfo />
        </Stack>
      </SelectedTaskContext.Provider>
    </TasksContext.Provider>
  );
};

export default Tasks;
