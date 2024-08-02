import DrawerComponent from "./DrawerComponent";
import SidebarList from "./SidebarList";
import SidebarItem from "./SidebarItem";
import {
  FormatListBulleted as FormatListBulletedIcon,
  DateRangeOutlined,
  GradeOutlined,
  HomeOutlined,
  LightModeOutlined,
  PersonOutlineOutlined
} from "@mui/icons-material";
import { List } from "@mui/material";

const Sidebar = () => {

  const items = [
    { text: 'My Day', icon: <LightModeOutlined />, to: '/tasks/today' },
    { text: 'Important', icon: <GradeOutlined />, to: '/tasks/important' },
    { text: 'Planned', icon: <DateRangeOutlined />, to: '/tasks/planned' },
    { text: 'Assigned to me', icon: <PersonOutlineOutlined />, to: '/tasks/assigned_to_me' },
    { text: 'Tasks', icon: <HomeOutlined />, to: '/tasks/inbox' },
  ];

  const lists = [
    { text: 'Test List 1', to: '/test1', count: 2, icon: <FormatListBulletedIcon /> },
    { text: 'Test List 2', to: '/test2', count: 4, icon: <FormatListBulletedIcon /> },
  ];

  return (
    <DrawerComponent variant="permanent">
      <SidebarList items={items} />
      <List>
        {lists.map((list, index) => (
          <SidebarItem key={index} item={list} count={list.count} />
        ))}
      </List>
    </DrawerComponent>
  );
};

export default Sidebar;
