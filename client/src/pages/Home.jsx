import Sidebar from "../components/Sidebar";
import Tasks from "../components/Tasks";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const [mode, setMode] = useState("light");
  const [showSideBar, setShowSideBar] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });


  useEffect(() => {
    document.documentElement.style.minHeight = '100%';
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ minHeight: '100vh' }} bgcolor={"background.default"} color={"text.primary"}>
          <Navbar setMode={setMode} mode={mode} menuClick={() => setShowSideBar(!showSideBar)} />
          <Stack direction="row" justifyContent="space-between">
            <Sidebar showSideBar={showSideBar} />
            <Tasks />
          </Stack>
        </Box>

      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
