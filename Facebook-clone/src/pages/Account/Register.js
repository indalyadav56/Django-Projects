import React, { useState, useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../store/actions/authAction";
import CircularProgress from "@material-ui/core/CircularProgress";

const Register = () => {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const handleClick = () => setOpen(!open);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const error = auth.error;
  const restponseData = auth.data;

  const onSubmit = (data) => {
    const username = data.username;
    const email = data.email;
    const password = data.password;
    dispatch(createUser(username, email, password));
  };

  useEffect(() => {
    if (localStorage.getItem("access")) {
      const home = history.push("/");
      return home;
    }
  }, []);
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClick();
        history.push("/");
      }}
    >
      {/*  show  error */}
      {error && <div>{alert(error.response.data.detail)}</div>}
      {/*  show  response */}
      {restponseData && <div>{alert(restponseData.message)}</div>}
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
                  fontSize: "16px",
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                name="username"
                inputRef={register}
              />
              <TextField
                autoComplete="off"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                type="email"
                name="email"
                inputRef={register}
              />
              <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                required
                name="password"
                inputRef={register}
              />
              {auth.loading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : (
                <Button type="submit" size="large" fullWidth>
                  Register
                </Button>
              )}

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
              <LoginButton onClick={() => history.push("/login")} fullWidth>
                Login
              </LoginButton>
            </Form>
          </Grid>
        </Grid>
      </Div>
    </Dialog>
  );
};

export default Register;
