import DrawerComponent from "./DrawerComponent";
import SidebarList from "./SidebarList";
import {
  DateRangeOutlined,
  GradeOutlined,
  HomeOutlined,
  LightModeOutlined
} from "@mui/icons-material";

const Sidebar = () => {

  const items = [
    { text: 'My Day', icon: <LightModeOutlined />, to: '/tasks/today' },
    { text: 'Important', icon: <GradeOutlined />, to: '/tasks/important' },
    { text: 'Upcoming', icon: <DateRangeOutlined />, to: '/tasks/upcoming' },
    { text: 'Tasks', icon: <HomeOutlined />, to: '/tasks/inbox' },
  ];

  return (
    <DrawerComponent variant="permanent">
      <SidebarList items={items} />
    </DrawerComponent>
  );
};

export default Sidebar;
