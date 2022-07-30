import React, { useEffect } from "react";
import styled from "styled-components";
import { Container, Grid, Typography } from "@material-ui/core";
import User from "./User";
import { getUser, getUserData } from "../../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import { getPostData } from "../../store/actions/postAction";

const People = () => {
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <Grid container>
      <Grid item md={3}>
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100%",
            maxWidth: 320,
            left: 0,
            marginTop: 60,
            padding: 10,
            top: 0,
            overflowy: "scroll",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              marginBottom: 50,
            }}
          >
            {user?.data?.map((u, i) => {
              return u?.profile?.map((p) => (
                <User
                  onClick={() => {
                    dispatch(getUserData(u?.id));
                    dispatch(getPostData(u?.id));
                  }}
                  key={u.id}
                  id={u?.id}
                  userImg={p?.user_image}
                  fullName={u?.full_name}
                />
              ));
            })}
          </div>
        </div>
      </Grid>
      <Grid item md={9}>
        {userData ? (
          <UserProfile
            id={userData?.id}
            userImage={userData?.profile[0]?.user_image}
            fullName={userData?.full_name}
            userBgImage={userData?.profile[0]?.user_bgImage}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <Typography variant="h4">Click To Show Profile</Typography>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default People;
