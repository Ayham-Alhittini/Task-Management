import React from 'react';
import { IconButton, Stack, useTheme } from '@mui/material';
import { ExitToAppOutlined as ExitToAppIcon, Delete } from '@mui/icons-material';

const TaskActions = ({ setTask, handleDeleteTask }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={'row'}
      width={'100%'}
      position={'absolute'}
      right={'0'}
      bottom={'0'}
      mt={2}
      textAlign="center"
      justifyContent={'space-between'}
      sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}
    >
      <IconButton color="primary" onClick={() => setTask(null)} aria-label="exit">
        <ExitToAppIcon />
      </IconButton>
      <IconButton color="error" onClick={handleDeleteTask} aria-label="delete task">
        <Delete />
      </IconButton>
    </Stack>
  );
}

export default TaskActions;
