import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
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
  PersonOutlineOutlined,
  Add 
} from "@mui/icons-material";

const Sidebar = ({ showSideBar }) => {
  const theme = useTheme();
  const items = [
    { text: 'My Day', icon: <LightModeOutlined />, href: '#home' },
    { text: 'Important', icon: <GradeOutlined />, href: '#important' },
    { text: 'Planned', icon: <DateRangeOutlined />, href: '#planned' },
    { text: 'Assigned to me', icon: <PersonOutlineOutlined />, href: '#assigned' },
    { text: 'Tasks', icon: <HomeOutlined />, href: '#tasks' },
  ];

  const lists = [
    { text: 'Test List 1', href: '#test1', count: 2, icon: <FormatListBulletedIcon /> },
    { text: 'Test List 2', href: '#test2', count: 4, icon: <FormatListBulletedIcon /> },
  ];

  return (
    <Box 
      sx={{ 
        display: showSideBar ? 'block' : 'none',
        width: { xs: 250, sm: 300 }, // Adjust width for mobile and desktop
        height: '100%',
        borderRight: { xs: 0, sm: `1px solid ${theme.palette.divider}` },
        boxShadow: { xs: 'none', sm: '1px 0px 2px rgba(0, 0, 0, 0.1)' },
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ width: "100%", height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', mt: '10px' }}>
        <Box>
          <List>
            {items.map((item, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton component="a" href={item.href} sx={{ '&:hover': { bgcolor: theme.palette.action.hover } }}>
                  <Tooltip title={item.text} placement="right" arrow>
                    <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon> {/* Adjust minWidth to reduce space */}
                  </Tooltip>
                  <ListItemText primary={item.text} sx={{ marginLeft: 0 }} /> {/* Remove margin */}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <List>
            {lists.map((list, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton component="a" href={list.href} sx={{ '&:hover': { bgcolor: theme.palette.action.hover } }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>{list.icon}</ListItemIcon> {/* Adjust minWidth to reduce space */}
                  <ListItemText primary={list.text} sx={{ marginLeft: 0 }} /> {/* Remove margin */}
                  <Typography variant="body2" sx={{ ml: 2 }}>{list.count}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: '0 10px' }}>
            <Add sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField label="New List" variant="standard" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
