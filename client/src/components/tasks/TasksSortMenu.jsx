import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useTasks } from '../../context/TasksContext';

const SortMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { tasks, setTasks } = useTasks();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (sortBy) => {
    setAnchorEl(null);
    if (sortBy) {
      const sortedTasks = sortTasks(tasks, sortBy);
      setTasks(sortedTasks);
    }
  };

  const sortTasks = (tasks, sortBy) => {
    switch (sortBy) {
      case 'alphabetically':
        return sortAlphabetically(tasks);
      case 'creationDate':
        return sortByCreationDate(tasks);
      case 'dueDate':
        return sortByDueDate(tasks);
      default:
        return tasks;
    }
  };

  const sortAlphabetically = (tasks) => {
    return [...tasks].sort((a, b) => a.taskTitle.localeCompare(b.taskTitle));
  };

  const sortByCreationDate = (tasks) => {
    return [...tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  const sortByDueDate = (tasks) => {
    return [...tasks].sort((a, b) => {
      if (a.taskDueDate && b.taskDueDate) {
        return new Date(a.taskDueDate) - new Date(b.taskDueDate);
      } else if (a.taskDueDate) {
        return -1;
      } else if (b.taskDueDate) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  return (
    <Box>
      <Button sx={{ color: '#747271' }} startIcon={<SwapVertIcon />} onClick={handleClick}>Sort</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
      >
        <MenuItem onClick={() => handleClose('dueDate')}>Due date</MenuItem>
        <MenuItem onClick={() => handleClose('alphabetically')}>Alphabetically</MenuItem>
        <MenuItem onClick={() => handleClose('creationDate')}>Creation date</MenuItem>
      </Menu>
    </Box>
  );
};

export default SortMenu;
