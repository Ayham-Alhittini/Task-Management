import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const MenuIconComponent = ({ onClick }) => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{ mr: 2 }}
      onClick={onClick}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MenuIconComponent;
