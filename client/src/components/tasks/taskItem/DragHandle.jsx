import { IconButton } from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const DragHandle = ({ attributes, listeners }) => (
  <IconButton {...attributes} {...listeners}>
    <DragIndicatorIcon />
  </IconButton>
);


export default DragHandle;