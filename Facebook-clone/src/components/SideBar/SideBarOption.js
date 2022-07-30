import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const SideBarOption = ({ Icon, title, onClick }) => {
  return (
    <List onClick={onClick} component="nav" aria-label="main mailbox folders">
      <ListItem button>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </List>
  );
};

export default SideBarOption;
