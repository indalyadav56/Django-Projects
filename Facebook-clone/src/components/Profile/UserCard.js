import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Avatar, Grid } from "@material-ui/core";
import styled from "styled-components";
import PopUp from "../Story/PopUp";
import UserProfile from "../User/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getUserData } from "../../store/actions/userAction";
import { getPostData } from "../../store/actions/postAction";
const Div = styled.div`
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.06);
  }
`;
const UserCard = ({ data }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  return (
    <>
      <Div
        onClick={() => {
          setOpenPopUp(true);
          dispatch(getUserData(data?.id));
          dispatch(getPostData(data?.id));
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            padding: 4,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              {data?.profile.map((profile) => {
                return <Avatar src={profile?.user_image} />;
              })}
            </div>
            <div style={{ marginLeft: 4 }}>
              <Typography>{data?.full_name}</Typography>
              <Typography variant="subtitle2">{data?.username}</Typography>
            </div>
          </div>
          <div>
            <Button
              size="small"
              style={{
                backgroundColor: "blue",
                color: "white",
                textTransform: "capitalize",
              }}
              onClick={() => {
                alert("added");
              }}
            >
              Add Friend
            </Button>
          </div>
        </Box>
      </Div>
      <PopUp
        // title={`${userData?.full_name}'s profile`}
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      >
        <UserProfile />
      </PopUp>
    </>
  );
};

export default UserCard;
