import { List, Divider } from "@mui/material";
import SidebarItem from "./SidebarItem";

const SidebarList = ({ items, theme }) => (
  <>
    <List sx={{ padding: 0 }}>
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} theme={theme} />
      ))}
    </List>
    <Divider sx={{ my: 1 }} />
  </>
);

export default SidebarList;
