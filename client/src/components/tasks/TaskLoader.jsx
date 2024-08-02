import React from 'react';
import { Stack, Skeleton } from '@mui/material';

const TaskLoader = () => (
  <Stack spacing={1}>
    <Skeleton variant="text" height={40} />
    <Skeleton variant="text" height={20} />
    <Skeleton variant="text" height={20} />
    <Skeleton variant="rectangular" height={100} />
  </Stack>
);

export default TaskLoader;
