import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../env";
import Headline from "./common/Headline";
import SingleCategory from "./common/SingleCategory";

const CategoryName = () => {
  const [categorynames, setCategorynames] = useState([]);
  useEffect(() => {
    const getCategoris = async () => {
      await axios({
        url: `${API}/categoris/`,
        method: "GET",
      })
        .then((response) => {
          // console.log(response.data);
          setCategorynames(response.data);
        })
        .catch((error) => {
          console.log("CategorY Name ", error);
        });
    };
    getCategoris();
  }, []);
  return (
    <Grid container spacing={3}>
      <Headline title="All" subtitle="Categoris" />
      {categorynames.map((item, i) => (
        <Grid key={i} item xs={6} sm={3} md={2} lg={2}>
          <SingleCategory item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryName;
