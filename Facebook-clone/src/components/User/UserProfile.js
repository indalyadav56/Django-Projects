import React, { useState, useEffect } from "react";
import { Avatar, Container, Grid, Typography, Paper } from "@material-ui/core";
import ProfileHeader from "./ProfileHeader";
import UserTab from "./UserTab";

const UserProfile = () => {
  return (
    <div>
      <Paper>
        <ProfileHeader />
      </Paper>
      <div>
        <UserTab />
      </div>
    </div>
  );
};

export default UserProfile;
