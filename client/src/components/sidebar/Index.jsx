import { useSidebarStatus } from "../../context/SidebarStatusContext";
import DrawerComponent from "./DrawerComponent";
import SidebarList from "./SidebarList";
import {
  DateRangeOutlined,
  GradeOutlined,
  HomeOutlined,
  LightModeOutlined
} from "@mui/icons-material";

const Sidebar = () => {

  const { isLargeScreen, setOpen } = useSidebarStatus();

  const items = [
    { text: 'My Day', icon: <LightModeOutlined />, to: '/tasks/today' },
    { text: 'Important', icon: <GradeOutlined />, to: '/tasks/important' },
    { text: 'Upcoming', icon: <DateRangeOutlined />, to: '/tasks/upcoming' },
    { text: 'Tasks', icon: <HomeOutlined />, to: '/tasks/inbox' },
  ];

  document.onclick = (e) => {
    if (isLargeScreen) return;
    

    //in case user click on anything but the icon menu make the sidebar closed
    //the icon menu we need not include it because we open the sidebar with it
    // setOpen(false);

  };

  return (
    <DrawerComponent variant="permanent">
      <SidebarList items={items} />
    </DrawerComponent>
  );
};

export default Sidebar;
