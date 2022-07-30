import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
import React from "react";
import styled from "@emotion/styled";
import { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const AboutDiv = styled(Paper)`
  display: flex;
  margin-top: 10px;
  padding: 10px;
`;

const List = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 40px;
  font-size: 16px;
  /* &:active {
    background-color: blue;
    color: white;
  } */
  &:hover {
    background-color: green;
    border-radius: 5px;
    color: white;
    transition: 0.5s ease;
    cursor: pointer;
  }
`;

const Index = (props) => {
  const userData = useSelector((state) => state.user.userData);
  console.log(userData);
  return (
    <Container>
      <Grid container justify="center" alignItems="center">
        <Grid item md={12}>
          <AboutDiv>
            <div
              style={{
                width: "30%",
                padding: 4,
              }}
            >
              <List isActive="isActive">Overview</List>
              <List>Contact Info</List>
            </div>
            <div
              style={{
                width: "70%",
              }}
            >
              <Typography variant="h5">Contact Information</Typography>
              <Divider />

              {/*  */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Typography variant="h5">Username</Typography>
                  <Typography variant="h6">{userData?.username}</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Typography variant="h5">Email:-</Typography>
                  <Typography variant="h6">{userData?.email}</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Typography variant="h5">DOB:-</Typography>
                  <Typography variant="h6">{userData?.profile?.dob}</Typography>
                </div>
              </div>
              {/*  */}
            </div>
          </AboutDiv>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
