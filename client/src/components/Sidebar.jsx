import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import {
  FormatListBulleted as FormatListBulletedIcon,
  DateRangeOutlined,
  GradeOutlined,
  HomeOutlined,
  LightModeOutlined,
  PersonOutlineOutlined
} from "@mui/icons-material";
import MuiDrawer from '@mui/material/Drawer';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ open, isLargeScreen }) => {
  const theme = useTheme();

  const items = [
    { text: 'My Day', icon: <LightModeOutlined />, to: '/tasks/today' },
    { text: 'Important', icon: <GradeOutlined />, to: '/tasks/important' },
    { text: 'Planned', icon: <DateRangeOutlined />, to: '/tasks/planned' },
    { text: 'Assigned to me', icon: <PersonOutlineOutlined />, to: '/tasks/assigned_to_me' },
    { text: 'Tasks', icon: <HomeOutlined />, to: '/tasks/inbox' },
  ];

  const lists = [
    { text: 'Test List 1', to: '/test1', count: 2, icon: <FormatListBulletedIcon /> },
    { text: 'Test List 2', to: '/test2', count: 4, icon: <FormatListBulletedIcon /> },
  ];

  const drawerWidth = 240;

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ open }) => ({
      '& .MuiDrawer-paper': {
        position: isLargeScreen ? 'relative' : 'absolute',
        top: isLargeScreen ? '0' : '57px',
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
    }),
  );

  return (
    <Drawer variant="permanent" open={open}>
      <List>
        {items.map((item, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                '&:hover': { bgcolor: theme.palette.action.hover },
                '&.active': { bgcolor: theme.palette.action.selected }
              }}
            >
              <Tooltip title={item.text} placement="right" arrow>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon> {/* Adjust minWidth to reduce space */}
                  <ListItemText primary={item.text} sx={{ marginLeft: 0 }} /> {/* Remove margin */}
                </Box>
              </Tooltip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List>
        {lists.map((list, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              component={NavLink}
              to={list.to}
              sx={{
                '&:hover': { bgcolor: theme.palette.action.hover },
                '&.active': { bgcolor: theme.palette.action.selected }
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>{list.icon}</ListItemIcon> {/* Adjust minWidth to reduce space */}
              <ListItemText primary={list.text} sx={{ marginLeft: 0 }} /> {/* Remove margin */}
              <Typography variant="body2" sx={{ ml: 2 }}>{list.count}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
