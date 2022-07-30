import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { Div, LoginButton, Form, Img, Title, ImgWraper } from "./style";
import Svg from "../../images/svg-1.svg";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { authLogin } from "../../store/actions/authAction";
import CircularProgress from "@material-ui/core/CircularProgress";

const Login = () => {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const handleClick = () => setOpen(!open);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const error = auth.error;

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    dispatch(authLogin(email, password));
  };

  useEffect(() => {
    setOpen(true);
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
      {error && <div>{alert(error?.response?.data?.detail)}</div>}
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                name="email"
                required
                inputRef={register({
                  required: true,
                })}
                fullWidth
              />
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                name="password"
                required
                inputRef={register({
                  required: true,
                })}
                fullWidth
              />

              {auth.loading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : (
                <LoginButton type="submit" size="large" fullWidth>
                  Login
                </LoginButton>
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
              <Button onClick={() => history.push("/register")} fullWidth>
                Register
              </Button>
            </Form>
          </Grid>
        </Grid>
      </Div>
    </Dialog>
  );
};

export default Login;
