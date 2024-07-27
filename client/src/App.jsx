import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import TaskInfo from "./components/TaskInfo";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const [selectedTask, setSelectedTask] = useState(null);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    document.documentElement.style.minHeight = '100%';
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minHeight: '100vh' }} bgcolor={"background.default"} color={"text.primary"}>
        <Navbar setMode={setMode} mode={mode}/>
        <Stack direction="row" justifyContent="space-between">
          <Sidebar/>
          <Tasks setSelectedTask={setSelectedTask} />
          <TaskInfo task={selectedTask} setTask={setSelectedTask} />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
