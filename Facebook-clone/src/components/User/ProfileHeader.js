import React from "react";
import { Avatar, IconButton, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const ProfileHeader = ({ id, userImage, fullName, userBgImage }) => {
  const userData = useSelector((state) => state.user.userData);
  return (
    <>
      <div
        style={{
          background: `url(${userData?.profile[0]?.user_bgImage})`,
          width: "100%",
          height: 400,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginBottom: "-150px",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton>
          <Avatar
            src={userData?.profile[0]?.user_image}
            style={{ width: 170, height: 170 }}
          />
        </IconButton>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">{userData?.full_name}</Typography>
      </div>
    </>
  );
};

export default ProfileHeader;
