import { Button, useTheme } from "@mui/material";
import { isToday } from '../../../utils/dateHelpers';

function TaskDayAction({ selectedTask, handleTextChange }) {

  const theme = useTheme();

  const handleButtonClick = () => {
    if (isToday(new Date(selectedTask.taskDay))) {
      handleTextChange('taskDay', null);
    } else {
      handleTextChange('taskDay', new Date());
    }
  };

  return (
    <Button
      onClick={handleButtonClick}
      sx={{
        display: 'block',
        margin: '20px auto',
        backgroundColor: selectedTask.taskDay ? theme.palette.error.main : theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover': {
          backgroundColor: selectedTask.taskDay ? theme.palette.error.dark : theme.palette.primary.dark,
        },
      }}
    >
      {selectedTask.taskDay ? 'Remove from my day' : 'Add to my day'}
    </Button>
  );
}

export default TaskDayAction;