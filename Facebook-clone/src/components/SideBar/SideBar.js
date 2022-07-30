import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../store/actions/profileAction";
import SideBarOption from "./SideBarOption";
import MessageIcon from "@material-ui/icons/Message";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useHistory } from "react-router";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const SideBar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const history = useHistory();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <>
      <List
        onClick={() => {
          history.push("/profile");
        }}
        component="nav"
        aria-label="main mailbox folders"
      >
        <ListItem button>
          <ListItemIcon>
            <Avatar src={profile?.user_image} />
          </ListItemIcon>
          <ListItemText primary="indalkumar" />
        </ListItem>
      </List>
      <SideBarOption
        Icon={HomeIcon}
        title="Home"
        onClick={() => {
          history.push("/");
        }}
      />
      <SideBarOption
        Icon={PeopleIcon}
        title="Friends"
        onClick={() => {
          history.push("/friends");
        }}
      />
      <SideBarOption
        Icon={MessageIcon}
        title="Messages"
        onClick={() => {
          // history.push("/photos")
        }}
      />
      <SideBarOption
        Icon={PhotoSizeSelectActualIcon}
        title="Photos"
        onClick={() => {
          history.push("/photos");
        }}
      />{" "}
      <SideBarOption Icon={ArrowDropDownIcon} title="See More" />
    </>
  );
};

export default SideBar;
