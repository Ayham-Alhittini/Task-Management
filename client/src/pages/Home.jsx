import Sidebar from "../components/sidebar/Index";
import Tasks from "../components/tasks/Index";
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../components/navbar/Index";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ModeContext } from '../context/ModeContext';
import { SidebarStatusProvider } from '../context/SidebarStatusContext'
import { SearchProvider } from "../context/SearchContext";

const Home = () => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme}>
        <ModeContext.Provider value={{ mode, setMode }}>
          <SidebarStatusProvider>
            <SearchProvider>

              <Stack flexDirection={'column'} height="100vh" overflow={'auto'} color={"text.primary"}>
                <Navbar />
                <Stack direction="row" flex={1} position={'relative'}>
                  <Sidebar />
                  <Tasks />
                </Stack>
              </Stack>

            </SearchProvider>
          </SidebarStatusProvider>
        </ModeContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default Home;
