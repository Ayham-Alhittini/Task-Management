import { AppBar, Toolbar } from "@mui/material";
import MenuIconComponent from "./MenuIconComponent";
import SearchComponent from "./SearchComponent";
import UserAvatarComponent from "./UserAvatarComponent";
import { Stack, Typography } from "@mui/material";

const Index = ({ mode, setMode, menuClick }) => (
  <AppBar position="sticky">
    <Toolbar>
      <Stack direction={'row'} alignItems={'center'} justifyContent="space-between" width="100%">
        <Stack direction={'row'} alignItems={'center'}>
          <MenuIconComponent onClick={menuClick} />
          <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
            To Do
          </Typography>
        </Stack>
        <SearchComponent />
        <UserAvatarComponent mode={mode} setMode={setMode} />
      </Stack>
    </Toolbar>
  </AppBar>
);


export default Index;
