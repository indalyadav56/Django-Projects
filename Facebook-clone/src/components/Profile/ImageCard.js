import { Divider, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
const Div = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const Img = styled.img`
  margin-top: 8px;
  width: 80px;
  height: 80px;
  margin: 4px;
  border-radius: 4px;
`;

const ImageCard = () => {
  const history = useHistory();
  const post = useSelector((state) => state.post.data);
  useEffect(() => {
    if (!localStorage.getItem("access")) {
      const home = history.push("/");
      return home;
    }
  }, []);
  return (
    <Div>
      <Paper style={{ padding: 8 }}>
        <Typography>Your Photos & Videos</Typography>
        <Divider />
        {post.map((item) => (
          <Img src={item.image} />
        ))}
      </Paper>
    </Div>
  );
};

export default ImageCard;
