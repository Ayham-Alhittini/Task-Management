import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useSidebarStatus } from '../../context/SidebarStatusContext';

const MenuIconComponent = () => {

  const { setOpen } = useSidebarStatus();

  const toggleSidebar = () => {
    setOpen(open => !open);
  }

  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{ mr: 2 }}
      onClick={toggleSidebar}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MenuIconComponent;
