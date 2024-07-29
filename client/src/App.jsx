import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import { Box, createTheme, Stack, ThemeProvider, useMediaQuery, Drawer } from "@mui/material";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SignIn from './components/SignIn'

function App() {
  const [mode, setMode] = useState("light");
  const [showSideBar, setShowSideBar] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const isMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));
  const navbarHeight = 56; // Example height, adjust as needed

  useEffect(() => {
    document.documentElement.style.minHeight = '100%';
    setShowSideBar(!isMobile);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme}>

        <SignIn />
        {/* <Box sx={{ minHeight: '100vh' }} bgcolor={"background.default"} color={"text.primary"}>
          <Navbar setMode={setMode} mode={mode} menuClick={() => setShowSideBar(!showSideBar)} />
          <Stack direction="row" justifyContent="space-between">
            {isMobile ? (
              <Drawer
                anchor="left"
                open={showSideBar}
                onClose={() => setShowSideBar(false)}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  "& .MuiDrawer-paper": {
                    marginTop: `${navbarHeight}px`,
                    width: "250px",
                  },
                }}
              >
                <Sidebar showSideBar={showSideBar} />
              </Drawer>
            ) : (
              <Sidebar showSideBar={showSideBar} />
            )}
            <Tasks />
          </Stack>
        </Box> */}
        
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
