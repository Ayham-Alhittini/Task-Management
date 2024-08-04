import { ListItemSecondaryAction } from "@mui/material";
import { PRIORITY_COLOR } from "../../../utils/constants";

const TaskPriority = ({ priority }) => (
  <ListItemSecondaryAction>
    <div style={{ width: '15px', height: '15px', backgroundColor: PRIORITY_COLOR[priority], borderRadius: '50%' }}>
    </div>
  </ListItemSecondaryAction>
);

export default TaskPriority;