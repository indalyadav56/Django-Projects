import {
  Container,
  Divider,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import NavBar from ".././components/header/NavBar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../env";
import { useSelector } from "react-redux";

const OrderProduct = () => {
  const { register, handleSubmit, errors } = useForm();
  const cart = useSelector((state) => state.cart);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("address", data.address);
    await axios
      .post(`${API}/order/`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.error === false) {
            alert("Congrates! Your Order is Success Now.");
            const data = window.localStorage.getItem("cart", cart.length);
            window.localStorage.setItem("cart", parseInt(data) - 1);
            return (window.location.href = "/");
          }
        }
      });
  };
  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <Container>
        <Grid Container>
          <Grid item>
            <Paper style={{ padding: 10 }}>
              <Typography variant="h5">Delivary Address</Typography>
              <Divider />
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Full Name"
                  fullWidth
                  name="name"
                  margin="normal"
                  variant="outlined"
                  inputRef={register({
                    required: "Your name is required!",
                  })}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
                <TextField
                  label="Email"
                  fullWidth
                  name="email"
                  margin="normal"
                  variant="outlined"
                  inputRef={register({
                    required: "Your Email is required!",
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Mobile"
                  type="number"
                  fullWidth
                  name="mobile"
                  margin="normal"
                  variant="outlined"
                  inputRef={register({
                    required: "Mobile Number is required!",
                  })}
                  error={Boolean(errors.mobile)}
                  helperText={errors.mobile?.message}
                />
                <TextField
                  label="Your Address"
                  helperText="Enter Your Full Address"
                  fullWidth
                  name="address"
                  margin="normal"
                  inputRef={register({
                    required: "address is required",
                  })}
                  variant="outlined"
                  multiline
                  rows={4}
                  error={Boolean(errors.address)}
                  helperText={errors.address?.message}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Button
                    type="submit"
                    style={{ backgroundColor: "blue", color: "white" }}
                    size="large"
                    variant="contained"
                  >
                    Place Order Now
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OrderProduct;
