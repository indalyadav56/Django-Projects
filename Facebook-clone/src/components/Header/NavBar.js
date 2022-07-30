import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  CssBaseline,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../../store/actions/authAction";
import SideBar from "../SideBar/SideBar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import PhotoIcon from "@material-ui/icons/Photo";
import PopUp from "../Story/PopUp";
import AddPost from "../Post/AddPost";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
  },
  appBar: {
    backgroundColor: "white",
  },
  toolbar: {
    display: "flex",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  loginButton: {
    width: 200,
    backgroundColor: "green",
    color: "white",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

const NavBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const profile = useSelector((state) => state.profile.data);
  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/* desktop section */}
          <div className={classes.sectionDesktop}>
            <div className="left">
              <IconButton
                onClick={() => {
                  history.push("/");
                }}
              >
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" />
              </IconButton>
              <input
                style={{
                  borderRadius: 50,
                  marginTop: 15,
                  border: "none",
                  outline: "none",
                  padding: 15,
                  height: 40,
                  fontSize: 16,
                  backgroundColor: "lightgray",
                  width: 250,
                }}
              />
            </div>
            <div className="center">
              <IconButton
                onClick={() => {
                  history.push("/");
                }}
              >
                <HomeIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => {
                  history.push("/friends");
                }}
              >
                <PeopleIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => {
                  history.push("/photos");
                }}
              >
                <PhotoIcon fontSize="large" />
              </IconButton>
            </div>
            <div className="right">
              <IconButton>
                <Avatar src={profile?.user_image} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setOpenPopUp(true);
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <IconButton onClick={handleClick}>
                <ArrowDropDownIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          {/* Mobile section */}
          <div className={classes.sectionMobile}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Typography
                color="secondary"
                variant="h5"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/");
                }}
              >
                FaceBook
              </Typography>
            </div>
            <div>
              <IconButton onClick={handleClick}>
                <Avatar src={profile?.user_image} />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* menu */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <Avatar src={profile?.user_image} />
            </ListItemIcon>
            <ListItemText primary="indalkumar" />
          </ListItem>
        </List>
        <MenuItem
          onClick={() => {
            history.push("/profile");
            handleClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
            handleClose();
            history.push("/login");
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <SideBar />
      </Drawer>

      {/* Pop up */}
      <PopUp title="Add Post" setOpenPopUp={setOpenPopUp} openPopUp={openPopUp}>
        <AddPost />
      </PopUp>
    </>
  );
};

export default NavBar;
