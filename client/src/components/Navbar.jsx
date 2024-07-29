import { Search as SearchIcon, Menu as MenuIcon, ModeNight } from "@mui/icons-material";
import {
  alpha,
  AppBar,
  Avatar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
  Switch,
} from "@mui/material";
import { useState } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: '10px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('lg')]: {
      width: '25vw',
      '&:focus': {
        width: '30vw',
      },
    },
  },
}));

const Navbar = ({ mode, setMode, menuClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Stack direction={'row'} alignItems={'center'}>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={menuClick}
            >
              <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
            To Do
          </Typography>
        </Stack>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Avatar onClick={handleMenuOpen}>AA</Avatar>
      </StyledToolbar>
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
        sx={{ mt: '45px', justifyContent: 'center' }} // Adjust the value as needed
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} sx={{ cursor: 'default' }}>Ayham Alhettini</MenuItem>
        <MenuItem>
          <ModeNight sx={{ mr: 2 }} />
          Dark Mode
          <Switch
            checked={mode === "dark"}
            onChange={ () => setMode(mode === "light" ? "dark" : "light")}
            sx={{ ml: 'auto' }}
          />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>

    </AppBar>
  );
};

export default Navbar;
