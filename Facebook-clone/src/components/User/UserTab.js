import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Post from "../Post/Post";
import { getPost } from "../../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/actions/profileAction";
import { IconButton, Typography } from "@material-ui/core";
import About from "../About";
import Friends from "../Friends";
import Photos from "../Photos";
import { Button } from "@material-ui/core";
import { FaFacebookMessenger } from "react-icons/fa";
import Messenger from "../Messenger/ChatBox";

const UserTab = ({ id }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [state, setState] = useState(false);
  const post = useSelector((state) => state.post.data);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const userData = useSelector((state) => state.user.userData);
  const postData = useSelector((state) => state.post.postData);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getPost());
  }, []);
  return (
    <>
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Posts" />
          <Tab label="About" />
          <Tab label="Friends" />
          <Tab label="Photos" />
          <Button
            onClick={() => {
              setState(true);
            }}
            style={{
              marginLeft: "auto",
              textTransform: "capitalize",
            }}
            color="inherit"
          >
            <FaFacebookMessenger
              style={{
                fontSize: 16,
                marginRight: 4,
              }}
            />
            <Typography>Message</Typography>
          </Button>
        </Tabs>
      </AppBar>

      {selectedTab === 0 && (
        <div>
          {postData?.map((item) => (
            <Post
              key={item?.id}
              id={item?.id}
              userName={item?.user?.username}
              userImage={profile?.user_image}
              image={item?.image}
              title={item?.title}
            />
          ))}
        </div>
      )}
      {selectedTab === 1 && <About />}
      {selectedTab === 2 && <Friends />}
      {selectedTab === 3 && <Photos />}
      {state && (
        <Messenger id={profile?.id} state={state} setState={setState} />
      )}
    </>
  );
};

export default UserTab;
