import { useState } from "react";
import { Avatar, Menu, MenuItem, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import { ModeNight } from "@mui/icons-material";
import { useMode } from "../../context/ModeContext";

const UserAvatarComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, setMode } = useMode();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar onClick={handleMenuOpen}>AA</Avatar>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ mt: '45px', justifyContent: 'center' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} sx={{ cursor: 'default' }}>Ayham Alhettini</MenuItem>
        <MenuItem>
          <ModeNight sx={{ mr: 2 }} />
          Dark Mode
          <Switch
            checked={mode === "dark"}
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            sx={{ ml: 'auto' }}
          />
        </MenuItem>
        <Link to={'/auth/signin'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleMenuClose}>
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};

export default UserAvatarComponent;
