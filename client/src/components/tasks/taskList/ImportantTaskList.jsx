import { Accordion, AccordionDetails, AccordionSummary, List, Typography } from "@mui/material";
import { useTasks } from "../../../context/TasksContext";
import TaskListItem from "../taskItem/Index";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ImportantTaskList() {
  const { tasks } = useTasks();

  const [highTasks, setHighTasks] = useState([]);
  const [moderateTasks, setModerateTasks] = useState([]);

  const filterTasksBasedOnPriority = () => {
    const inCompelteTasks = tasks.filter(task => !task.isTaskCompleted);

    setHighTasks(inCompelteTasks.filter(task => task.taskPriority === 'High'));
    setModerateTasks(inCompelteTasks.filter(task => task.taskPriority === 'Moderate'));
  }

  useEffect(filterTasksBasedOnPriority, [tasks]);

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
          <Typography>High</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            highTasks.map(task => (
              <TaskListItem key={task.id} task={task} draggable={false} />
            ))
          }
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Moderate</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            moderateTasks.map(task => (
              <TaskListItem key={task.id} task={task} draggable={false} />
            ))
          }
        </AccordionDetails>
      </Accordion>
    </List>
  );
}

export default ImportantTaskList;
