import { Chip, ListItemText } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import dayjs from 'dayjs';

const TaskText = ({ text, isTaskCompleted, dueDate }) => (
  <ListItemText
    primary={text}
    secondary={
      <>
        {
          dueDate &&
          <Chip
            icon={<EventIcon />}
            label={dayjs(dueDate).format('MMMM D, YYYY')}
            component="span"
          />
        }
      </>
    }
    style={{ textDecoration: isTaskCompleted ? 'line-through' : 'none' }}
  />
);

export default TaskText;