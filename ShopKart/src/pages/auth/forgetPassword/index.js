import { useState } from "react";
import SVG from "../../../assets/undraw_Login_re_4vu2.svg";

import Input from "../../../components/common/Input";
import SignUpButton from "../../../components/common/Button";
import Container from "../../../components/common/Container";
import Image from "../../../components/common/Image";
import Title from "../../../components/common/Title";

import { InputAdornment } from "@material-ui/core";

import EmailIcon from "@material-ui/icons/Email";

import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <Container>
      <div className="leftside_div">
        <Image src={SVG} />
      </div>
      <div className="rightside_div">
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

export default ForgetPassword;
