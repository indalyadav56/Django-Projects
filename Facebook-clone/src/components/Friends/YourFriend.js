import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import UserCard from "./UserCard";
const YourFriend = () => {
  const [data, setDataa] = useState([
    {
      image: null,
    },
    {
      image: null,
    },
    {
      image: null,
    },
    {
      image: null,
    },
    {
      image: null,
    },
    {
      image: null,
    },
    {
      image: null,
    },
  ]);
  return (
    <div
      style={{
        marginTop: 8,
        padding: 10,
      }}
    >
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item md={3}>
            <UserCard />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default YourFriend;
