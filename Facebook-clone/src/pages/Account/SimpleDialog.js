import React from "react";
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { Div, LoginButton, Form, Img, Title, ImgWraper } from "./style";
import Svg from "../../images/svg-1.svg";

const SimpleDialog = ({ open }) => {
  return (
    <Dialog open={open}>
      <Div>
        <Grid container>
          <Grid item md={4}>
            <Div style={{ backgroundColor: "green", height: 500 }}>
              <Title>Login</Title>
              <p
                style={{
                  align: "center",
                  color: "white",
                  marginLeft: 10,
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, nesciunt!
              </p>
              <ImgWraper>
                <Img src={Svg} style={{ width: "90%" }} />
              </ImgWraper>
            </Div>
          </Grid>
          <Grid item md={8}>
            <Form>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <LoginButton size="large" fullWidth>
                Login
              </LoginButton>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 8,
                  marginBottom: 8,
                }}
              >
                <p>OR</p>
              </div>
              <Button fullWidth>Register</Button>
            </Form>
          </Grid>
        </Grid>
      </Div>
    </Dialog>
  );
};

export default SimpleDialog;
