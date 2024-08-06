import { Button, useTheme } from "@mui/material";
import { isToday } from '../../../utils/dateHelpers';

function TaskDayAction({ selectedTask, handleTextChange }) {

  const theme = useTheme();

  const isSelectedTaskOnTodayTasks = isToday(new Date(selectedTask.taskDay));

  const handleButtonClick = () => {
    if (isSelectedTaskOnTodayTasks) {
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
        backgroundColor: isSelectedTaskOnTodayTasks ? theme.palette.error.main : theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover': {
          backgroundColor: isSelectedTaskOnTodayTasks ? theme.palette.error.dark : theme.palette.primary.dark,
        },
      }}
    >
      {isSelectedTaskOnTodayTasks ? 'Remove from my day' : 'Add to my day'}
    </Button>
  );
}

export default TaskDayAction;