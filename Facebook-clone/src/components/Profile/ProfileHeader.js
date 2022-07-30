import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  Snackbar,
  Paper,
  Grid,
} from "@material-ui/core";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { API } from "../../server/server";
import EditProfile from "./EditProfile";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateCoverImage } from "../../store/actions/profileAction";
import PopUp from "../Story/PopUp";
import EmptySVG from "../../images/empty.svg";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
    height: 300,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
}));

const ProfileHeader = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [image, setImage] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = async (e) => {
    setOpen(true);
    let file = e.target.files[0];
    setImage(file);
    let reader = new FileReader();
    reader.onloadend = async function () {
      const fileTypes = ["jpg", "png", "jpeg", "PNG"];
      const fileType = file.name.split(".")[1];
      if (!fileTypes.includes(fileType)) {
        setOpen(false);
        return alert(`please upload a valid file format. (${fileTypes})`);
      }

      setImageUrl(reader.result);
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const { vertical, horizontal } = state;

  const handleSubmit = () => {
    dispatch(updateCoverImage(image));
    setOpen(false);
    alert("updated successfully!");
  };

  return (
    <>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Paper
            style={{
              background: `url(${profile?.user_bgImage})`,
              width: "96%",
              height: 250,
              margin: "10px auto 0 auto",
            }}
          >
            <div>
              <Button
                component="label"
                style={{
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                <input type="file" hidden onChange={handleChange} />
                Edit Cover <span style={{ marginRight: 3 }}></span> <EditIcon />
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={12} xs={12}>
          <Paper
            style={{
              width: "96%",
              height: 50,
              margin: "0 auto 0 auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "70%",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Button
                  style={{
                    marginRight: 10,
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    setOpenPopUp(true);
                  }}
                >
                  Friends
                </Button>
                <Button
                  onClick={() => {
                    history.push("/photos");
                  }}
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  Photos
                </Button>
              </div>
              <div>
                <Button
                  style={{
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    history.push("/edit/profile");
                  }}
                >
                  Edit Profile <EditIcon style={{ marginLeft: 8 }} />
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
      {/* Dialog */}
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle id="simple-dialog-title">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Upload Background Images</Typography>
            <Button component="label" style={{ color: "white" }}>
              <input type="file" hidden onChange={handleChange} />
              <EditIcon style={{ color: "black" }} />
            </Button>
          </div>
        </DialogTitle>
        <div style={{ padding: 20 }}>
          {imageUrl && (
            <div>
              <img style={{ width: "95%" }} src={imageUrl} />
            </div>
          )}
        </div>
        <Button
          style={{ backgroundColor: "green", margin: 10, color: "white" }}
          onClick={handleSubmit}
        >
          Upload Image
        </Button>
      </Dialog>

      {/*  snackbar */}

      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={state.open}
        onClose={handleClose}
        message="I love snacks"
        key={state.vertical + state.horizontal}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>

      {/* pop up */}
      <PopUp
        title="Your Friends"
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      >
        <img
          src={EmptySVG}
          style={{
            width: 400,
          }}
        />
      </PopUp>
    </>
  );
};

export default ProfileHeader;
