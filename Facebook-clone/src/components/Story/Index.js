import React, { useState, useEffect } from "react";
import { Avatar, Container, Typography } from "@material-ui/core";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import PopUp from "./PopUp";

const StoryDiv = styled(Container)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.06);
  }
`;

const Index = ({ id, image, username, user_image }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  return (
    <>
      <StoryDiv
        style={{
          background: `url(${image})`,
          backgroundSize: "cover",
        }}
        onClick={() => {
          setOpenPopUp(true);
        }}
      >
        <Avatar src={user_image} />
        <Typography>{username}</Typography>
      </StoryDiv>
      <PopUp
        title="Your Story"
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      >
        <div>
          <img src={image} style={{ width: "100%" }} />
        </div>
      </PopUp>
    </>
  );
};

export default Index;
