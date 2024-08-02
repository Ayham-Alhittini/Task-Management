import Sidebar from "../components/sidebar/Index";
import Tasks from "../components/tasks/Index";
import { Box, createTheme, Stack, ThemeProvider, useMediaQuery } from "@mui/material";
import Navbar from "../components/navbar/Index";
import { useState, useEffect, useRef } from "react";
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


  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    if (navRef && navRef.current) {
      console.log(navRef.current.clientHeight);
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme}>
        <Stack flexDirection={'column'} height="100vh" overflow={'auto'} bgcolor={"background.default"} color={"text.primary"}>
          <Navbar setMode={setMode} mode={mode} menuClick={() => setOpen(!open)} />
          <Stack direction="row" flex={1} position={'relative'}>
            <Sidebar open={open} onDrawerToggle={() => setOpen(!open)} isLargeScreen={isLargeScreen} />
            <Tasks isLargeScreen={isLargeScreen} />
          </Stack>
        </Stack>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
