import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";
const SidebarList = ({ items }) => (
  <>
    <List sx={{ padding: 0 }}>
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </List>
  </>
);

export default SidebarList;
