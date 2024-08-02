import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Box, Typography, useTheme } from "@mui/material";
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ item, count }) => {
  const theme = useTheme();
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NavLink}
        to={item.to}
        sx={{
          '&:hover': { bgcolor: theme.palette.action.hover },
          '&.active': { bgcolor: theme.palette.action.selected },
        }}
      >
        <Tooltip title={item.text} placement="right" arrow>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ marginLeft: 0 }} />
            {count !== undefined && <Typography variant="body2" sx={{ ml: 2 }}>{count}</Typography>}
          </Box>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  );
}

export default SidebarItem;
