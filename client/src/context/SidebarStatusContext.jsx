import { useMediaQuery, useTheme } from "@mui/material";
import { createContext, useState } from "react";
import { useContext } from "react";

const SidebarStatusContext = createContext();

export const useSidebarStatus = () => useContext(SidebarStatusContext);

export const SidebarStatusProvider = ({ children }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(isLargeScreen);

  return (
    <SidebarStatusContext.Provider value={{ isLargeScreen, open, setOpen }} >
      {children}
    </SidebarStatusContext.Provider>
  );
}
