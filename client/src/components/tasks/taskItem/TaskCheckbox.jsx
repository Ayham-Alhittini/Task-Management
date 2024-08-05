import Checkbox from '@mui/material/Checkbox';
import { useTasks } from '../../../context/TasksContext';
import taskService from '../../../services/TaskService';
import taskCompletedSound from '../../../assets/task-completed-effect.wav';

function TaskCheckbox({ taskId, isTaskCompleted, initialMargin }) {

  const { setTasks } = useTasks();

  const playSuccessSoundIfCompleted = (toggledCheckStatus) => {
    if (toggledCheckStatus) {
      const audio = new Audio(taskCompletedSound);
      audio.play();
    }
  }


  const handleToggleCompleted = (id) => {
    const toggledCheckStatus = !isTaskCompleted;
    setTasks(tasks => tasks.map(task =>
      task.id === id ? { ...task, isTaskCompleted: toggledCheckStatus } : task
    ));
    taskService.updateTask(id, { isTaskCompleted: toggledCheckStatus });
    playSuccessSoundIfCompleted(toggledCheckStatus);
  };


  return (
    <Checkbox
      edge="start"
      checked={isTaskCompleted}
      tabIndex={-1}
      disableRipple
      sx={{ ml: initialMargin ? 2 : null }}
      onClick={(event) => {
        event.stopPropagation();
        handleToggleCompleted(taskId);
      }}
    />
  );
};

export default TaskCheckbox;