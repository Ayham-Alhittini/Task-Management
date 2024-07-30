import Sidebar from "../components/Sidebar";
import Tasks from "../components/Tasks";
import { Box, createTheme, Stack, ThemeProvider, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const isLargeScreen = useMediaQuery(darkTheme.breakpoints.up('md'));
  const [open, setOpen] = useState(isLargeScreen);

  useEffect(() => {
    document.documentElement.style.minHeight = '100%';
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ minHeight: '100vh' }} bgcolor={"background.default"} color={"text.primary"}>
          <Navbar setMode={setMode} mode={mode} menuClick={() => setOpen(!open)} />
          <Stack direction="row">
            <Sidebar open={open} onDrawerToggle={() => setOpen(!open)} isLargeScreen={isLargeScreen} />
            <Tasks />
          </Stack>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
