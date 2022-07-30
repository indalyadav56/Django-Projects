import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { useSelector, useDispatch } from "react-redux";
const ChatHeader = ({ closeChat, fullName, userImage }) => {
  const userData = useSelector((state) => state.userData);
  const profileData = useSelector((state) => state.profile.profileData);

  const handleClose = () => {
    closeChat();
  };
  useEffect(() => {}, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton>
          <Avatar src={profileData?.user_image} />
        </IconButton>
        <div>
          <Typography>{profileData?.user?.full_name}</Typography>
          <Typography variant="subtitle2">
            {profileData?.user?.is_active && "Active Now"}
          </Typography>
        </div>
      </div>
      <div>
        <IconButton onClick={handleClose}>
          <ClearIcon
            style={{
              color: "red",
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatHeader;
