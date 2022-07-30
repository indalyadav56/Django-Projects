import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";

const User = ({ onClick, id, userImg, fullName }) => {
  return (
    <List onClick={onClick} component="nav" aria-label="main mailbox folders">
      <ListItem button>
        <ListItemIcon>
          <Avatar
            src={userImg}
            style={{ height: 60, width: 60, marginRight: 4 }}
          />
        </ListItemIcon>
        <div>
          <ListItemText primary={fullName} />
          <Button
            size="small"
            style={{
              backgroundColor: "#2d88ff",
              textTransform: "capitalize",
              color: "white",
              marginRight: 4,
            }}
            onClick={() => {
              alert("Added Friend");
            }}
          >
            Add Friend
          </Button>
          <Button
            size="small"
            style={{
              backgroundColor: "#3a3b3c",
              textTransform: "capitalize",
              color: "white",
            }}
            onClick={() => {
              alert("removed");
            }}
          >
            Remove Friend
          </Button>
        </div>
      </ListItem>
    </List>
  );
};

export default User;
