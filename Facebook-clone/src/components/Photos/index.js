import { Container, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import PopUp from "../Story/PopUp";
import { getPostData } from "../../store/actions/postAction";
import { useSelector, useDispatch } from "react-redux";
const Index = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const userPostData = useSelector((state) => state.post.postData);
  const dispatch = useDispatch();
  const data = [];

  return (
    <>
      <Container
        style={{
          marginTop: 10,
        }}
      >
        <Paper
          elevation={0}
          style={{
            padding: 8,
          }}
        >
          <Typography variant="h5">Your Photos</Typography>
          <Grid container spacing={2}>
            {userPostData.filter((item) => {
              if (item.image) {
                data.push(item.image);
              }
            })}
            {data.map((item) => {
              return (
                <Grid
                  item
                  md={3}
                  style={{
                    cursor: "pointer",
                    marginTop: 10,
                  }}
                  onClick={() => {
                    setOpenPopUp(true);
                  }}
                >
                  <img src={item} style={{ width: 200, borderRadius: 10 }} />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Container>
      {/*  */}
      <PopUp
        title="Your Story"
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      >
        <img
          src=" https://images.unsplash.com/photo-1618941026766-87c219e0d3d3?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTl8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          style={{ width: "100%" }}
        />
      </PopUp>
    </>
  );
};

export default Index;
