import { Accordion, AccordionDetails, AccordionSummary, List, Typography } from "@mui/material";
import { useTasks } from "../../../context/TasksContext";
import TaskListItem from "../taskItem/Index";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { isToday, isTomorrow, isThisWeek, isThisMonth } from '../../../utils/dateHelpers';
function UpcomingTaskList() {
  const { tasks } = useTasks();

  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [thisWeekTasks, setThisWeekTasks] = useState([]);
  const [thisMonthTasks, setThisMonthTasks] = useState([]);

  const filterTasksBasedOnDueDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const incompleteTasks = tasks.filter(task => !task.isTaskCompleted);

    setTodayTasks(incompleteTasks.filter(task => isToday(new Date(task.taskDueDate))));
    setTomorrowTasks(incompleteTasks.filter(task => isTomorrow(new Date(task.taskDueDate))));
    setThisWeekTasks(incompleteTasks.filter(task => isThisWeek(new Date(task.taskDueDate))));
    setThisMonthTasks(incompleteTasks.filter(task => isThisMonth(new Date(task.taskDueDate))));
  };

  useEffect(filterTasksBasedOnDueDate, [tasks]);

  return (
    <List
      sx={{
        mt: 2,
        height: '70vh',
        overflowY: 'auto',
      }}
    >
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Today</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            todayTasks.map(task => (
              <TaskListItem key={task.id} task={task} draggable={false} />
            ))
          }
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Tomorrow</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            tomorrowTasks.map(task => (
              <TaskListItem key={task.id} task={task} draggable={false} />
            ))
          }
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography>This Week</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            thisWeekTasks.map(task => (
              <TaskListItem key={task.id} task={task} draggable={false} />
            ))
          }
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography>This Month</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            thisMonthTasks.map(task => (
              <TaskListItem key={task.id} task={task} draggable={false} />
            ))
          }
        </AccordionDetails>
      </Accordion>
    </List>
  );
}

export default UpcomingTaskList;
