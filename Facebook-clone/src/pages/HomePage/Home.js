import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Post from "../../components/Post/Post";
import Widget from "../../components/Widget/Widget";
import styled from "styled-components";
import {
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  Divider,
  Avatar,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../store/actions/postAction";
import { getProfile } from "../../store/actions/profileAction";
import AddPost from "../../components/Post/AddPost";
import Story from "../../components/Story/Index";
import { getUser } from "../../store/actions/userAction";
import { getStory } from "../../store/actions/storyAction";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import UserCard from "../../components/Profile/UserCard";
import DoubleArrowSharpIcon from "@material-ui/icons/DoubleArrowSharp";
import { useHistory } from "react-router";
import CreateStory from "../../components/Story/CreateStory";
import Messenger from "../../components/Messenger/ChatBox";
import SwipeableViews from "react-swipeable-views";

const Div = styled.div`
  width: 90%;
  height: 100vh;
`;

const StoryContainer = styled.div`
  display: flex;
  height: 350px;
  width: 100%;
  margin-top: 10px;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;
const PeopleDiv = styled(Paper)`
  @media screen and (max-width: 960px) {
    display: none;
  }
`;
const SideBarDiv = styled.div`
  @media screen and (max-width: 960px) {
    display: none;
  }
`;
const CreateStoryDiv = styled.div`
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const Home = () => {
  const post = useSelector((state) => state.post.data);
  const profile = useSelector((state) => state.profile.data);
  const story = useSelector((state) => state.story.data);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState([
    { image: null, username: null, user_image: null },
    { image: null, username: null, user_image: null },
    { image: null, username: null, user_image: null },
  ]);

  useEffect(() => {
    if (!localStorage.getItem("access")) {
      return history.push("/login");
    }
    dispatch(getPost());
    dispatch(getProfile());
    dispatch(getUser());
    dispatch(getStory());
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item md={2} xs={12}>
          <SideBarDiv
            style={{
              top: 60,
              width: 220,
              height: "100vh",
              position: "fixed",
            }}
          >
            <SideBar />
          </SideBarDiv>
        </Grid>
        <Grid item md={7} sm={12} xs={12}>
          <CreateStoryDiv style={{ display: "flex", marginTop: 10 }}>
            <div>
              <CreateStory image={profile?.user_image} />
            </div>
            <Swiper
              style={{ height: 400 }}
              spaceBetween={10}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {story?.map((item) => {
                return (
                  <SwiperSlide>
                    <Story
                      id={item.id}
                      user_image={profile?.user_image}
                      username={item?.user?.username}
                      image={item?.image}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </CreateStoryDiv>

          <AddPost />

          <div
            style={{
              width: 1000,
              marginLeft: 70,
            }}
          >
            {post &&
              post?.map((item) => {
                console.log("itemmmmm", item);
                return (
                  <Post
                    key={item?.id}
                    id={item.id}
                    likeData={item?.like}
                    userName={profile?.user?.username}
                    userImage={profile?.user_image}
                    image={item?.image}
                    title={item?.title}
                  />
                );
              })}
          </div>
        </Grid>
        <Grid item md={3} xs={12}>
          <PeopleDiv
            elevation={0}
            style={{ padding: 8, marginTop: 8 }}
            style={{
              top: 70,
              width: "300px",
              height: "100vh",
              position: "fixed",
              padding: 8,
            }}
          >
            <Typography variant="h5">You May Know </Typography>
            <Divider />

            {user?.data?.map((item, i) => {
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
              fullWidth
              style={{
                textTransform: "capitalize",
              }}
            >
              <Typography>See More</Typography>
              <DoubleArrowSharpIcon />
            </Button>
          </PeopleDiv>
        </Grid>
      </Grid>
      <Messenger />
    </>
  );
};

export default Home;
