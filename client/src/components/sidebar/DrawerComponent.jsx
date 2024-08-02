import { styled } from "@mui/material/styles";
import { useSidebarStatus } from '../../context/SidebarStatusContext';
import MuiDrawer from "@mui/material/Drawer";

const drawerWidth = 240;

const DrawerComponent = styled(MuiDrawer)(({ theme }) => {
  const { open, isLargeScreen } = useSidebarStatus();

  return {
    '& .MuiDrawer-paper': {
      position: isLargeScreen ? 'relative' : 'absolute',
      whiteSpace: 'nowrap',
      width: open ? drawerWidth : 0,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
      }),
    },
  };
});

export default DrawerComponent;
