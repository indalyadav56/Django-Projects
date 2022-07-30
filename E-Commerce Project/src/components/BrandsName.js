import React, { useState, useEffect } from "react";
import { API } from "../env";
import Headline from "../components/common/Headline";
import SingleBrandName from "../components/common/SingleBrandName";
import { Grid } from "@material-ui/core";
import axios from "axios";

const BrandsName = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const getbrands = async () => {
      await axios({
        url: `${API}/brandsname/`,
        method: "GET",
      }).then((response) => {
        setBrands(response.data);
      });
    };
    getbrands();
  }, []);
  return (
    <Grid container spacing={3}>
      <Headline title="All" subtitle="Brands" />
      {brands.map((item, i) => (
        <Grid xs={6} sm={3} md={2} lg={2} item>
          <SingleBrandName key={i} item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BrandsName;
