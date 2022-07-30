import { useState } from "react";
import SVG from "../../../assets/undraw_Login_re_4vu2.svg";

import Input from "../../../components/common/Input";
import GoogleSignInBtn from "../../../components/common/Button";
import FaceBookSignInBtn from "../../../components/common/Button";
import SignUpButton from "../../../components/common/Button";
import Container from "../../../components/common/Container";
import Image from "../../../components/common/Image";
import Title from "../../../components/common/Title";
import OR from "../../../components/common/or";

import { IconButton, InputAdornment } from "@material-ui/core";

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";

import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container>
      <div className="leftside_div">
        <Image src={SVG} />
      </div>
      <div className="rightside_div">
        <Title>Log In</Title>
        <p>
          Welcome back! login with you data that you entered during registraion
        </p>
        <GoogleSignInBtn fullWidth size="large">
          Google Sign In
        </GoogleSignInBtn>
        <FaceBookSignInBtn fullWidth size="large">
          FaceBook Sign In
        </FaceBookSignInBtn>
        <OR>or</OR>
        <Input
          fullWidth
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
        <SignUpButton color="primary" fullWidth size="large">
          Sign Up
        </SignUpButton>
        <p className="container">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </Container>
  );
};

export default SignUp;
