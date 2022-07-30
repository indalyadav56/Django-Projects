import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Button,
  Typography,
  Grid,
  makeStyles,
  Avatar,
  Box,
  IconButton,
  Divider,
} from "@material-ui/core";
import ProfileHeader from "./ProfileHeader";
import styled from "styled-components";
import Post from "../Post/Post";
import { AboutDiv, Div } from "./style";
import { useHistory } from "react-router";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DetailRow from "./DetailRow";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../store/actions/profileAction";
import { getUser } from "../../store/actions/userAction";
import { getPost } from "../../store/actions/postAction";
import UserCard from "./UserCard";
import DoubleArrowSharpIcon from "@material-ui/icons/DoubleArrowSharp";
import AddPost from "../Post/AddPost";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 2,
    display: "flex",
    width: "100%",
  },
}));

const Profile = ({ showall = true }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post.data);
  const [state, setState] = useState(10);

  useEffect(() => {
    if (!localStorage.getItem("access")) {
      const home = history.push("/");
      return home;
    }
    dispatch(getProfile());
    dispatch(getPost());
    dispatch(getUser());
  }, []);
  return (
    <>
      <ProfileHeader />

      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <Paper
              style={{
                position: "sticky",
                top: 80,
              }}
            >
              <Div>
                <Avatar
                  src={profile?.user_image}
                  style={{ height: 140, width: 140 }}
                />
                <IconButton>
                  <CameraAltIcon />
                </IconButton>
                <AboutDiv>
                  <Typography
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginTop: 4,
                      marginBottom: 4,
                    }}
                  >
                    {profile?.user?.username}
                  </Typography>
                  <Typography>{profile?.user?.full_name}</Typography>
                  <DetailRow Icon={LocationOnIcon} title="India" />
                  <DetailRow Icon={LinkIcon} title="Your Website url" />
                  <DetailRow Icon={DateRangeIcon} title={profile?.dob} />

                  <Typography style={{ textAlign: "center", marginTop: 10 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat, soluta!
                  </Typography>
                </AboutDiv>
              </Div>
            </Paper>
          </Grid>
          <Grid item md={6} xs={12}>
            <AddPost />
            <Paper>
              <div
                style={{
                  width: 800,
                }}
              >
                {post.map((item) => (
                  <Post
                    key={item?.id}
                    id={item?.id}
                    userName={profile?.user?.username}
                    userImage={profile?.user_image}
                    image={item.image}
                    title={item.title}
                  />
                ))}
              </div>
            </Paper>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper
              style={{
                position: "sticky",
                top: 80,
                padding: 8,
              }}
            >
              <Typography>Add Friend </Typography>
              <Divider />

              {user?.data?.map((item, i) => {
                console.log("item");
                console.log("index", i);
                return (
                  <>
                    {i <= 10 && (
                      <div>
                        <UserCard data={item} />
                      </div>
                    )}
                  </>
                );
              })}
              <Button
                onClick={() => {
                  history.push("/friends");
                }}
                fullWidth
                style={{
                  textTransform: "capitalize",
                }}
              >
                <Typography>See More</Typography>
                <DoubleArrowSharpIcon />
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
