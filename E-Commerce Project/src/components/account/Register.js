import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { domain } from "../../env";
import axios from "axios";
import NavBar from "../header/NavBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    if (data.password == data.confirm_password) {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      axios
        .post(`${domain}/account/user/register/`, formData)
        .then((response) => {
          if (response.status === 200) {
            history.push("/login");
          }
        })
        .then((error) => {
          console.log(error);
        });
    } else {
      alert("Password should be matched!");
    }
  };
  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={register({
                required: "Email is required",
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              inputRef={register({
                required: "password is required!",
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({
                required: "Confirm password is required!",
              })}
              error={Boolean(errors.confirm_password)}
              helperText={errors.confirm_password?.message}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login">{"Already have an account? Sign In"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Register;
