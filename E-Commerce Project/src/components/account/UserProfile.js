import React, { useState, useEffect } from "react";
import {
  Grid,
  Avatar,
  Button,
  Typography,
  TextField,
  Container,
  Paper,
} from "@material-ui/core";
import NavBar from "../header/NavBar";
import { API } from "../../env";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const AccountProfile = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    id: null,
    full_name: "",
    image: null,
    username: "",
    mobile: "",
    address: "",
    user: [],
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", values.id);
    formData.append("full_name", values.full_name);
    formData.append("username", values.username);
    formData.append("mobile", values.mobile);
    formData.append("address", values.address);

    await axios
      .put(`${API}/profile/`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          if (response.data.error == "false") {
            alert("Updated Successfully!");
            window.location.reload();
          }
        }
      });
  };

  useEffect(() => {
    const getProfile = async () => {
      await axios
        .get(`${API}/profile/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setValues(response.data);
        });
    };
    getProfile();
  }, []);

  const handleImageUpload = (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    axios
      .put(`${API}/profile/`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          alert("Successfully upload");
          window.location.reload();
        }
      });
  };

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: 10 }}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Paper align="center" style={{ padding: 10 }}>
              <Avatar
                src={values.image}
                style={{ width: 200, height: 200, margin: 5 }}
              />
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h4"
                margin="normal"
              >
                {values.full_name}
              </Typography>
              <Button color="secondary" component="label" variant="contained">
                Chnage Image{" "}
                <input
                  type="file"
                  name="image"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
            </Paper>
          </Grid>
          <Grid item md={8}>
            <Paper style={{ padding: 10 }}>
              <Typography>Edit Profile</Typography>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                disabled
                value={values.user.email || ""}
              />
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                margin="normal"
                value={values.username}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Full name"
                name="full_name"
                variant="outlined"
                margin="normal"
                value={values.full_name}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                type="number"
                label="First name"
                name="mobile"
                variant="outlined"
                margin="normal"
                value={values.mobile}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="First name"
                name="address"
                variant="outlined"
                margin="normal"
                value={values.address}
                onChange={handleChange}
                multiline
                rows={4}
              />

              <Button
                margin="normal"
                onClick={handleSubmit}
                color="secondary"
                variant="contained"
                fullWidth
                style={{ marginTop: 10 }}
              >
                Save
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AccountProfile;
