import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright(props) {

  const currentYear = new Date().getFullYear();

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://ayham-alhettini.web.app/">
        Ayham Alhettini
      </Link>{' '}
      {currentYear}
      {'.'}
    </Typography>
  );
}

export default Copyright;