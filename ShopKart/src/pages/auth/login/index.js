import { useState } from "react";

import SVG from "../../../assets/undraw_Login_re_4vu2.svg";

import Input from "../../../components/common/Input";
import GoogleSignInBtn from "../../../components/common/Button";
import FaceBookSignInBtn from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import LoginButton from "../../../components/common/Button";
import Container from "../../../components/common/Container";
import Image from "../../../components/common/Image";
import OR from "../../../components/common/or";

import { IconButton, InputAdornment } from "@material-ui/core";

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container>
      <div className="leftside_div">
        <Image src={SVG} />
      </div>
      <div className="rightside_div">
        <Title variant="h4">Log in</Title>
        <Title>
          Welcome back! login with you data that you entered during registraion
        </Title>
        <GoogleSignInBtn fullWidth size="large">
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="logo"
            width="25"
            height="25"
          />
          Google Sign In
        </GoogleSignInBtn>
        <FaceBookSignInBtn fullWidth size="large">
          <img
            src="https://img.icons8.com/color/48/000000/facebook.png"
            alt=""
            width="25"
            height="25"
          />
          FaceBook Sign In
        </FaceBookSignInBtn>
        <OR>or</OR>
        <Input
          fullWidth
          type="email"
          label="Email"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <Input
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton onClick={handleShowPassword}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            ),
          }}
        />
        <LoginButton fullWidth color="primary" size="large">
          Login
        </LoginButton>
        <p className="container">
          Don't have an account? <Link href="/signup">Register</Link>
          <Link to="/forget-password">Forget Password?</Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
